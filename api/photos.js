import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Missing Supabase configuration' })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    if (req.method === 'GET') {
      // Get all photos
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return res.status(200).json(data || [])
    }

    if (req.method === 'POST') {
      // Upload new photo
      const { name, data: imageData, uploadedAt } = req.body

      if (!name || !imageData) {
        return res.status(400).json({ error: 'Missing name or image data' })
      }

      // Extract image type and base64 data
      const imageMatch = imageData.match(/^data:image\/(\w+);base64,(.+)$/)
      if (!imageMatch) {
        return res.status(400).json({ error: 'Invalid image data format' })
      }
      
      const imageType = imageMatch[1] || 'jpeg'
      const base64Data = imageMatch[2]
      const buffer = Buffer.from(base64Data, 'base64')
      
      // Sanitize filename
      const sanitizedName = name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const fileName = `${Date.now()}-${sanitizedName}`
      const filePath = `photos/${fileName}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('photo-library')
        .upload(filePath, buffer, {
          contentType: `image/${imageType}`,
          upsert: false,
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('photo-library')
        .getPublicUrl(filePath)

      // Save metadata to database
      const { data: dbData, error: dbError } = await supabase
        .from('photos')
        .insert({
          name,
          url: urlData.publicUrl,
          uploaded_at: uploadedAt || new Date().toISOString(),
        })
        .select()
        .single()

      if (dbError) throw dbError

      return res.status(201).json(dbData)
    }

    if (req.method === 'DELETE') {
      // Delete photo
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'Missing photo ID' })
      }

      // Get photo to find file path
      const { data: photo, error: fetchError } = await supabase
        .from('photos')
        .select('url')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      // Extract file path from URL
      const urlParts = photo.url.split('/photo-library/')
      const filePath = urlParts[1]

      // Delete from storage
      if (filePath) {
        await supabase.storage.from('photo-library').remove([filePath])
      }

      // Delete from database
      const { error: deleteError } = await supabase
        .from('photos')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: error.message })
  }
}

