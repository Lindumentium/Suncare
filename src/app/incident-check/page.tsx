'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

const SEVERITY_LEVELS = [
  { value: 1, emoji: "😊", label: "I'm okay" },
  { value: 2, emoji: "🙂", label: "Minor concern" },
  { value: 3, emoji: "😐", label: "Moderate concern" },
  { value: 4, emoji: "😟", label: "Serious concern" },
  { value: 5, emoji: "😨", label: "Emergency" }
]

export default function IncidentCheckPage() {
  const router = useRouter()
  const [selectedSeverity, setSelectedSeverity] = useState<number | null>(null)

  const handleSeveritySelect = (severity: number) => {
    setSelectedSeverity(severity)
    if (severity >= 4) {
      router.push('/emergency')
    } else {
      router.push('/incident-report')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-primary" />
            <h1 className="text-3xl font-bold">Is anyone hurt?</h1>
            <p className="text-xl text-muted-foreground">
              Please select how urgent this situation is
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {SEVERITY_LEVELS.map((level) => (
              <Button
                key={level.value}
                variant="outline"
                className={`h-32 flex flex-col items-center justify-center gap-2 text-2xl
                  ${selectedSeverity === level.value ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => handleSeveritySelect(level.value)}
              >
                <span className="text-4xl" role="img" aria-label={level.label}>
                  {level.emoji}
                </span>
                <span className="text-sm font-medium">{level.label}</span>
              </Button>
            ))}
          </div>

          <p className="text-center text-muted-foreground">
            If you're unsure, please choose a higher level of concern.
            It's better to be safe.
          </p>
        </div>
      </Card>
    </div>
  )
}

