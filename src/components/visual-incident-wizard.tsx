'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getStepOptions, getStepTitle, OptionCard as OptionCardType } from './wizard-step-options'
import { OptionCard } from './option-card'
import { UnitSelector } from './unit-selector'
import { CommonAreaSelector } from './common-area-selector'
import { WitnessDetails } from './witness-details'
import { ReportedIncidentDetails } from './reported-incident-details'

export function VisualIncidentWizard() {
  const router = useRouter()
  const [step, setStep] = React.useState(1)
  const [selections, setSelections] = React.useState<Record<string, any>>({})
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [incidentId] = React.useState(`INC${Math.random().toString(36).substr(2, 9).toUpperCase()}`)

  const handleSelection = (stepId: string, optionId: string, value?: any) => {
    setSelections(prev => ({ ...prev, [stepId]: { id: optionId, value } }))
  }

  const handleNext = () => {
    if (selections[step]?.id === 'offsite') {
      router.push('/emergency')
      return
    }
    if (selections[step]?.id === 'shops') {
      window.location.href = 'https://centre-management.example.com'
      return
    }
    setStep(prev => prev + 1)
  }

  const handleBack = () => {
    setStep(prev => prev - 1)
  }

  const renderExpandedContent = () => {
    const currentSelection = selections[step]?.id
    
    switch (step) {
      case 3: // Where
        if (currentSelection === 'unit') {
          return (
            <UnitSelector
              value={selections[step]?.value || ''}
              onChange={(value) => handleSelection(String(step), 'unit', value)}
            />
          )
        } else if (currentSelection === 'common') {
          return (
            <CommonAreaSelector
              value={selections[step]?.value || ''}
              onChange={(value) => handleSelection(String(step), 'common', value)}
            />
          )
        }
        break
      case 4: // What & Why
        return (
          <div className="mt-4 space-y-4">
            {currentSelection === 'witnessed' && (
              <WitnessDetails
                value={selections[step]?.value?.details || ''}
                onChange={(value) => handleSelection(String(step), 'witnessed', { ...selections[step]?.value, details: value })}
              />
            )}
            {currentSelection === 'reported' && (
              <ReportedIncidentDetails
                reporterName={selections[step]?.value?.reporterName || ''}
                makeReport={selections[step]?.value?.makeReport || ''}
                anonymous={selections[step]?.value?.anonymous || ''}
                onReporterNameChange={(value) => handleSelection(String(step), 'reported', { ...selections[step]?.value, reporterName: value })}
                onMakeReportChange={(value) => handleSelection(String(step), 'reported', { ...selections[step]?.value, makeReport: value })}
                onAnonymousChange={(value) => handleSelection(String(step), 'reported', { ...selections[step]?.value, anonymous: value })}
              />
            )}
            <div>
              <Label htmlFor="additional-info" className="text-lg">Is there anything else you'd like to add?</Label>
              <Textarea
                id="additional-info"
                className="mt-2"
                value={selections[step]?.value?.additionalInfo || ''}
                onChange={(e) => handleSelection(String(step), currentSelection, { ...selections[step]?.value, additionalInfo: e.target.value })}
              />
            </div>
          </div>
        )
    }
  }

  if (step === 5) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="flex justify-center">
          <Check className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold">Thank You</h2>
        <Card className="p-6 bg-accent/20">
          <p className="text-lg font-medium">Your Incident ID:</p>
          <p className="text-3xl font-bold text-primary mt-2">{incidentId}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please keep this ID for your records
          </p>
        </Card>
        <Button
          onClick={() => router.push('/')}
          size="lg"
          className="mt-4"
        >
          Return Home
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{getStepTitle(step)}</h2>
        {step > 1 && (
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {getStepOptions(step, () => setShowCalendar(true)).map((option: OptionCardType) => (
          <OptionCard
            key={option.id}
            {...option}
            isSelected={selections[step]?.id === option.id}
            onClick={() => {
              if (option.id === 'other' && step === 2) {
                setShowCalendar(true)
              } else {
                handleSelection(String(step), option.id)
              }
            }}
          />
        ))}
      </motion.div>

      {renderExpandedContent()}

      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select a Date</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <CalendarComponent
              mode="single"
              selected={selections[2]?.value || new Date()}
              onSelect={(date) => {
                setShowCalendar(false)
                if (date) {
                  handleSelection('2', 'other', date)
                }
              }}
              initialFocus
              className="rounded-md border"
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          size="lg"
          className="text-lg"
          disabled={!selections[step]}
        >
          {step < 4 ? "That looks right" : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

