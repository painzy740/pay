"use client"

import { useEffect } from "react"

export default function DownloadHelper() {
  useEffect(() => {
    // Add a global helper function to download images
    window.downloadImage = async (imageUrl: string, filename: string) => {
      try {
        // Fetch the image
        const response = await fetch(imageUrl)
        const blob = await response.blob()

        // Create a blob URL
        const blobUrl = URL.createObjectURL(blob)

        // Create a link element
        const link = document.createElement("a")
        link.href = blobUrl
        link.download = filename

        // Append to the document
        document.body.appendChild(link)

        // Trigger the download
        link.click()

        // Clean up
        document.body.removeChild(link)
        URL.revokeObjectURL(blobUrl)

        return true
      } catch (error) {
        console.error("Download error:", error)
        return false
      }
    }
  }, [])

  return null
}

