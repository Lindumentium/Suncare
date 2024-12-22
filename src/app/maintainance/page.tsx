'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Lightbulb, Droplets, Thermometer, DoorClosed, Wrench, ArrowLeft } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const MAINTENANCE_CATEGORIES = [
  { icon: <Lightbulb className="h-6 w-6" />, label: "Electrical", value: "electrical" },
  { icon: <Droplets className="h-6 w-6" />, label: "Plumbing", value: "plumbing" },
  { icon: <Thermometer className="h-6 w-6" />, label: "Heating/Cooling", value: "hvac" },
  { icon: <DoorClosed className="h-6 w-6" />, label: "Doors/Windows", value: "doors" },
  { icon: <Wrench className="h-6 w-6" />, label: "Other", value: "other" },
]

const URGENCY_LEVELS = [
  { label: "Low - Can wait", value: "low" },
  { label: "Medium - Fix soon", value: "medium" },
  { label: "High - Fix today", value: "high" },
]

export default function MaintenancePage() {
  const router = useRouter()
  const [category, setCategory] = useState<string>('')
  const [urgency, setUrgency] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    // Show success message and reset form or redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-center">
                Maintenance Request
              </h1>
              <p className="text-center text-muted-foreground">
                Please tell us what needs to be fixed
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-lg">What type of problem is it?</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {MAINTENANCE_CATEGORIES.map((cat) => (
                    <Button
                      key={cat.value}
                      type="button"
                      variant="outline"
                      className={`h-24 flex flex-col items-center justify-center gap-2
                        ${category === cat.value ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setCategory(cat.value)}
                    >
                      {cat.icon}
                      <span>{cat.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency" className="text-lg">
                  How urgent is this?
                </Label>
                <Select
                  value={urgency}
                  onValueChange={setUrgency}
                >
                  <SelectTrigger className="text-lg h-12">
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    {URGENCY_LEVELS.map((level) => (
                      <SelectItem
                        key={level.value}
                        value={level.value}
                        className="text-lg"
                      >
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-lg">
                  Can you tell us more about the problem?
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe the problem..."
                  className="min-h-[150px] text-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="submit"
                size="lg"
                className="text-lg"
                disabled={!category || !urgency || !description}
              >
                Submit Request
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

