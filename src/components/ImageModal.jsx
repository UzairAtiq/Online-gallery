import { X, Download } from "lucide-react"
import { Button } from "./ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"

export default function ImageModal({ photo, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = photo.url || photo.data
    link.download = photo.name || "photo.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative z-50 max-w-5xl max-h-[90vh] w-full"
        >
          {/* Pixel-style border */}
          <div className="relative border-4 border-background bg-background rounded-lg overflow-hidden shadow-2xl">
            <div className="absolute inset-0 border-2 border-border pointer-events-none opacity-50" />
            
            {/* Image */}
            <div className="relative bg-muted/20">
              <img
                src={photo.url || photo.data}
                alt={photo.name || "Photo"}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>

            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={handleDownload}
                className="bg-background/90 hover:bg-background backdrop-blur-sm"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={onClose}
                className="bg-background/90 hover:bg-background backdrop-blur-sm"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Photo name */}
            {photo.name && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-sm border-t border-border">
                <p className="text-sm text-muted-foreground">{photo.name}</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

