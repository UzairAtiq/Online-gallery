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

  // Load photos from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const savedPhotos = localStorage.getItem('gallery-photos')
      if (savedPhotos) {
        try {
          setPhotos(JSON.parse(savedPhotos))
        } catch (err) {
          console.error('Error loading photos:', err)
        }
      }
      setLoading(false)
    }
  }, [isAuthenticated])

  // Save photos to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && photos.length > 0) {
      localStorage.setItem('gallery-photos', JSON.stringify(photos))
    }
  }, [photos, isAuthenticated])

  const handleUpload = async (photo) => {
    const newPhoto = {
      id: Date.now().toString(),
      name: photo.name,
      url: photo.data,
      uploaded_at: photo.uploadedAt || new Date().toISOString(),
    }
    setPhotos((prev) => [newPhoto, ...prev])
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this photo?")) {
      return
    }
    setPhotos((prev) => prev.filter((photo) => photo.id !== id))
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
