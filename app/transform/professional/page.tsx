'use client'

import { useState } from 'react'
import { ImageGenerator } from '@/components/shared/image-generator'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ProfessionalImage() {
  const [style, setStyle] = useState('natural')
  const [brightness, setBrightness] = useState([50])
  const [contrast, setContrast] = useState([50])
  const [saturation, setSaturation] = useState([50])

  const additionalControls = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="style">Enhancement Style</Label>
        <Select value={style} onValueChange={setStyle}>
          <SelectTrigger id="style">
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="natural">Natural</SelectItem>
            <SelectItem value="vibrant">Vibrant</SelectItem>
            <SelectItem value="dramatic">Dramatic</SelectItem>
            <SelectItem value="vintage">Vintage</SelectItem>
            <SelectItem value="bw">Black & White</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Brightness</Label>
        <Slider value={brightness} onValueChange={setBrightness} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <Label>Contrast</Label>
        <Slider value={contrast} onValueChange={setContrast} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <Label>Saturation</Label>
        <Slider value={saturation} onValueChange={setSaturation} max={100} step={1} />
      </div>
    </div>
  )

  return (
    <ImageGenerator
      title="Professional Image Enhancement"
      description="Create high-quality professional images with AI"
      transformationType="professional"
      promptPlaceholder="Describe your professional image (e.g., 'A modern office space with natural lighting and minimalist design')"
      additionalControls={additionalControls}
      aspectRatio="square"
    />
  )
}
