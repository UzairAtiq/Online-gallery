import { Upload } from "lucide-react"
import { Button } from "./ui/button"
import PhotoCard from "./PhotoCard"
import UploadDialog from "./UploadDialog"
import ImageModal from "./ImageModal"
import { useState } from "react"

export default function Gallery({ photos, onDelete, onUpload }) {
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [viewingPhoto, setViewingPhoto] = useState(null)

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto border-4 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
            <Upload className="h-12 w-12 text-muted-foreground/50" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Your photo library is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start building your collection by uploading your first photo
            </p>
          </div>
          <Button onClick={() => setIsUploadOpen(true)} size="lg">
            <Upload className="h-4 w-4 mr-2" />
            Upload Photo
          </Button>
        </div>
        <UploadDialog
          open={isUploadOpen}
          onOpenChange={setIsUploadOpen}
          onUpload={onUpload}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Photo Library</h1>
          <p className="text-muted-foreground mt-1">
            {photos.length} {photos.length === 1 ? "photo" : "photos"}
          </p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Photo
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onView={setViewingPhoto}
            onDelete={onDelete}
          />
        ))}
      </div>

      <UploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onUpload={onUpload}
      />
      
      {viewingPhoto && (
        <ImageModal
          photo={viewingPhoto}
          onClose={() => setViewingPhoto(null)}
        />
      )}
    </div>
  )
}

