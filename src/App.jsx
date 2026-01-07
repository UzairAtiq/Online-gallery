import { useState, useEffect } from "react"
import Gallery from "./components/Gallery"
import PasswordProtection from "./components/PasswordProtection"
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  // Check authentication on mount
  useEffect(() => {
    const authenticated = localStorage.getItem('gallery-authenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Load photos from API
  useEffect(() => {
    if (isAuthenticated) {
      fetchPhotos()
    }
  }, [isAuthenticated])

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/photos')
      if (!response.ok) throw new Error('Failed to fetch photos')
      const data = await response.json()
      setPhotos(data)
    } catch (err) {
      console.error('Error fetching photos:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (photo) => {
    try {
      const response = await fetch('/api/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: photo.name,
          data: photo.data,
          uploadedAt: photo.uploadedAt || new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error('Failed to upload photo')
      
      const newPhoto = await response.json()
      setPhotos((prev) => [newPhoto, ...prev])
    } catch (err) {
      console.error('Error uploading photo:', err)
      alert('Failed to upload photo. Please try again.')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this photo?")) {
      return
    }

    try {
      const response = await fetch(`/api/photos?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete photo')
      
      setPhotos((prev) => prev.filter((photo) => photo.id !== id))
    } catch (err) {
      console.error('Error deleting photo:', err)
      alert('Failed to delete photo. Please try again.')
    }
  }

  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)} />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading photos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Gallery photos={photos} onDelete={handleDelete} onUpload={handleUpload} />
      </div>
    </div>
  )
}

export default App
