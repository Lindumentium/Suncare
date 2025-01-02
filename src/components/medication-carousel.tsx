'use client'

import * as React from 'react'
import { Pill, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'

interface Medication {
  id: string
  name: string
  time: string
  isChecked?: boolean
}

const MEDICATIONS: Medication[] = [
  { id: '1', name: 'Aspirin', time: 'Morning' },
  { id: '2', name: 'Vitamin D', time: 'Morning' },
  { id: '3', name: 'Iron Supplement', time: 'Afternoon' },
  { id: '4', name: 'Calcium', time: 'Evening' },
  { id: '5', name: 'Vitamin C', time: 'Morning' },
  { id: '6', name: 'Magnesium', time: 'Evening' },
]

export function MedicationCarousel({ isEditable = false }: { isEditable?: boolean }) {
  const [medications, setMedications] = React.useState(MEDICATIONS)

  const handleCheckMedication = (medicationId: string, checked: boolean) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === medicationId ? { ...med, isChecked: checked } : med
      )
    )
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {medications.map((medication) => (
          <Dialog key={medication.id}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex flex-col items-center space-y-2 h-auto py-4 px-6"
              >
                <div className="relative">
                  <Pill className="h-8 w-8" />
                  {medication.isChecked && (
                    <Check className="h-4 w-4 absolute -right-1 -top-1 text-green-500" />
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">{medication.name}</span>
                  <span className="text-xs text-muted-foreground">{medication.time}</span>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{medication.name} Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <h4 className="font-medium">Schedule</h4>
                  <p className="text-sm text-muted-foreground">
                    Take medication during: {medication.time}
                  </p>
                </div>
                {isEditable && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`medication-${medication.id}`}
                      checked={medication.isChecked}
                      onCheckedChange={(checked) => 
                        handleCheckMedication(medication.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`medication-${medication.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Mark as taken
                    </label>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </ScrollArea>
  )
}

