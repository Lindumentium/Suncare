'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, CalendarIcon, Mic, MicOff, Check } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface WizardProps {
  onComplete: (data: any) => void
}

export function IncidentWizard({ onComplete }: WizardProps) {
  const router = useRouter()
  const [step, setStep] = React.useState(1)
  const [formData, setFormData] = React.useState({
    involved: '',
    when: 'now',
    whenDate: new Date(),
    whenTime: '',
    location: '',
    unitNumber: '',
    description: '',
    witnessed: '',
    notice: '',
  })
  const [isRecording, setIsRecording] = React.useState(false)
  const [incidentId] = React.useState(`INC${Math.random().toString(36).substr(2, 9).toUpperCase()}`)

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (formData.location === 'offsite') {
      router.push('/emergency')
      return
    }
    if (formData.location === 'shops') {
      window.location.href = 'https://centre-management.example.com'
      return
    }
    setStep(prev => prev + 1)
  }

  const handleBack = () => {
    setStep(prev => prev - 1)
  }

  const toggleSpeechToText = () => {
    if (!isRecording) {
      if ('webkitSpeechRecognition' in window) {
        const recognition = new (window as any).webkitSpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map(result => result.transcript)
            .join('')

          handleInputChange('description', transcript)
        }

        recognition.start()
        setIsRecording(true)
      }
    } else {
      // Stop recording logic
      setIsRecording(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Who was involved?</h2>
            <Input
              className="text-lg p-6"
              placeholder="Enter names of people involved"
              value={formData.involved}
              onChange={(e) => handleInputChange('involved', e.target.value)}
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">When did it happen?</h2>
            <RadioGroup
              value={formData.when}
              onValueChange={(value) => handleInputChange('when', value)}
              className="grid gap-4"
            >
              <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="now" />
                <span className="text-xl">Just now</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="earlier" />
                <span className="text-xl">Earlier today</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="other" />
                <span className="text-xl">Another day</span>
              </Label>
            </RadioGroup>

            {formData.when === 'earlier' && (
              <RadioGroup
                value={formData.whenTime}
                onValueChange={(value) => handleInputChange('whenTime', value)}
                className="grid gap-4"
              >
                <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="morning" />
                  <span className="text-xl">Morning</span>
                </Label>
                <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="lunch" />
                  <span className="text-xl">Lunch</span>
                </Label>
                <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="dinner" />
                  <span className="text-xl">Dinner</span>
                </Label>
                <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="night" />
                  <span className="text-xl">Night</span>
                </Label>
              </RadioGroup>
            )}

            {formData.when === 'other' && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full text-lg p-6 flex justify-between items-center"
                  >
                    {formData.whenDate ? (
                      format(formData.whenDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="h-6 w-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.whenDate}
                    onSelect={(date) => handleInputChange('whenDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Where did it happen?</h2>
            <RadioGroup
              value={formData.location}
              onValueChange={(value) => handleInputChange('location', value)}
              className="grid gap-4"
            >
              <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="unit" />
                <span className="text-xl">Unit</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="common" />
                <span className="text-xl">Common Area</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="office" />
                <span className="text-xl">Office</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="kitchen" />
                <span className="text-xl">Kitchen</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="offsite" />
                <span className="text-xl">Offsite</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="shops" />
                <span className="text-xl">Shops</span>
              </Label>
            </RadioGroup>

            {formData.location === 'unit' && (
              <div className="space-y-2">
                <Label className="text-xl">Unit Number</Label>
                <Input
                  className="text-lg p-6"
                  placeholder="Enter unit number"
                  value={formData.unitNumber}
                  onChange={(e) => handleInputChange('unitNumber', e.target.value)}
                />
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">What happened?</h2>
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={toggleSpeechToText}
                  className="flex items-center gap-2"
                >
                  {isRecording ? (
                    <>
                      <MicOff className="h-5 w-5" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="h-5 w-5" />
                      Start Recording
                    </>
                  )}
                </Button>
              </div>
              <textarea
                className="w-full min-h-[200px] text-lg p-4 rounded-lg border"
                placeholder="Please describe what happened..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Why did it happen?</h2>
            <RadioGroup
              value={formData.witnessed}
              onValueChange={(value) => handleInputChange('witnessed', value)}
              className="grid gap-4"
            >
              <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="yes" />
                <span className="text-xl">I witnessed it</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="no" />
                <span className="text-xl">I didn't witness it</span>
              </Label>
            </RadioGroup>

            <div className="space-y-2">
              <Label className="text-xl">Did you notice anything?</Label>
              <textarea
                className="w-full min-h-[150px] text-lg p-4 rounded-lg border"
                placeholder="Please share any observations..."
                value={formData.notice}
                onChange={(e) => handleInputChange('notice', e.target.value)}
              />
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <Check className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold">Thank You</h2>
            <p className="text-xl">Your incident report has been submitted.</p>
            <Card className="p-6 mt-4">
              <p className="text-lg font-medium">Your Incident ID:</p>
              <p className="text-2xl font-bold text-primary">{incidentId}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Please keep this ID for your records
              </p>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="space-y-8">
      {renderStep()}

      <div className="flex justify-between">
        {step > 1 && step < 6 && (
          <Button
            type="button"
            onClick={handleBack}
            variant="outline"
            size="lg"
            className="text-lg"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
        )}
        
        {step < 6 && (
          <Button
            type="button"
            onClick={handleNext}
            size="lg"
            className="text-lg ml-auto"
          >
            {step === 5 ? 'Submit' : 'Next'}
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        )}

        {step === 6 && (
          <Button
            type="button"
            onClick={() => router.push('/')}
            size="lg"
            className="text-lg mx-auto"
          >
            Return Home
          </Button>
        )}
      </div>
    </div>
  )
}

