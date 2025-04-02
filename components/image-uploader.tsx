'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }, [])

  const handleFile = useCallback(
    (file: File) => {
      // Check if file is an image
      if (!file.type.match('image.*')) {
        alert('Please select an image file')
        return
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          onImageUpload(e.target.result)
        }
      }
      reader.readAsDataURL(file)
    },
    [onImageUpload]
  )

  return (
    <div
      className={`flex h-[300px] flex-col items-center justify-center border-2 ${isDragging ? 'border-primary' : 'border-dashed'} rounded-md transition-colors`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileInput}
      />

      <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
      <p className="mb-2 text-muted-foreground">
        {isDragging ? 'Drop image here' : 'Drag & drop image here'}
      </p>
      <p className="mb-4 text-sm text-muted-foreground">Supports: JPG, PNG, WebP (Max 5MB)</p>

      <Button variant="outline" asChild>
        <label htmlFor="file-upload" className="cursor-pointer">
          Browse Files
        </label>
      </Button>
    </div>
  )
}
