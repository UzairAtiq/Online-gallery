import { useState } from "react"
import { Eye, Download, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"

export default function PhotoCard({ photo, onView, onDelete }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = photo.url || photo.data
    link.download = photo.name || "photo.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div
      className="group relative overflow-hidden rounded-lg border-2 border-border bg-card transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Pixel-style frame border */}
      <div className="absolute inset-0 border-2 border-background pointer-events-none opacity-50" />
      
      <div className="aspect-square relative bg-muted/20">
        <img
          src={photo.url || photo.data}
          alt={photo.name || "Photo"}
          className="w-full h-full object-cover"
        />
        
        {/* Hover overlay with actions */}
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-2 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onView(photo)}
            className="bg-background/90 hover:bg-background"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleDownload}
            className="bg-background/90 hover:bg-background"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(photo.id)}
            className="bg-destructive/90 hover:bg-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Photo name */}
      {photo.name && (
        <div className="p-2 bg-background/80 backdrop-blur-sm border-t border-border">
          <p className="text-xs text-muted-foreground truncate">{photo.name}</p>
        </div>
      )}
    </div>
  )
}

