'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Users, Clock, MapPin, MessageCircle, Eye, Home, Building, Coffee, ShoppingBag, Sun, Moon, CalendarIcon, Check, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface OptionCard {
  id: string
  icon: React.ReactNode
  label: string
  description?: string
  action?: () => void
}

export function VisualIncidentWizard() {
  const router = useRouter()
  const [step, setStep] = React.useState(1)
  const [selections, setSelections] = React.useState<Record<string, string>>({})
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [incidentId] = React.useState(`INC${Math.random().toString(36).substr(2, 9).toUpperCase()}`)

  const handleSelection = (stepId: string, optionId: string) => {
    setSelections(prev => ({ ...prev, [stepId]: optionId }))
    
    // Handle special cases
    if (optionId === 'offsite') {
      router.push('/emergency')
      return
    }
    if (optionId === 'shops') {
      window.location.href = 'https://centre-management.example.com'
      return
    }

    setStep(prev => prev + 1)
  }

  const getStepOptions = (): OptionCard[] => {
    switch (step) {
      case 1: // Who
        return [
          { id: 'resident', icon: <Users className="h-8 w-8" />, label: 'Resident' },
          { id: 'staff', icon: <Users className="h-8 w-8" />, label: 'Staff Member' },
          { id: 'visitor', icon: <Users className="h-8 w-8" />, label: 'Visitor' },
        ]
      case 2: // When
        return [
          { id: 'now', icon: <Clock className="h-8 w-8" />, label: 'Just Now' },
          { 
            id: 'morning', 
            icon: <Sun className="h-8 w-8" />, 
            label: 'Morning',
            description: 'Between 6am - 12pm' 
          },
          { 
            id: 'lunch', 
            icon: <Coffee className="h-8 w-8" />, 
            label: 'Lunch Time',
            description: 'Between 12pm - 2pm' 
          },
          { 
            id: 'evening', 
            icon: <Moon className="h-8 w-8" />, 
            label: 'Evening',
            description: 'After 2pm' 
          },
          { 
            id: 'other', 
            icon: <CalendarIcon className="h-8 w-8" />, 
            label: 'Another Day',
            action: () => setShowCalendar(true)
          },
        ]
      case 3: // Where
        return [
          { id: 'unit', icon: <Home className="h-8 w-8" />, label: 'Unit' },
          { id: 'common', icon: <Building className="h-8 w-8" />, label: 'Common Area' },
          { id: 'kitchen', icon: <Coffee className="h-8 w-8" />, label: 'Kitchen' },
          { id: 'offsite', icon: <MapPin className="h-8 w-8" />, label: 'Offsite' },
          { id: 'shops', icon: <ShoppingBag className="h-8 w-8" />, label: 'Shops' },
        ]
      case 4: // What & Why
        return [
          { 
            id: 'witnessed', 
            icon: <Eye className="h-8 w-8" />, 
            label: 'I Saw It Happen',
            description: 'I was there when it happened'
          },
          { 
            id: 'reported', 
            icon: <MessageCircle className="h-8 w-8" />, 
            label: 'Someone Told Me',
            description: 'I heard about it from others'
          },
        ]
      default:
        return []
    }
  }

  const getStepTitle = (): string => {
    switch (step) {
      case 1:
        return 'Who was involved?'
      case 2:
        return 'When did it happen?'
      case 3:
        return 'Where did it happen?'
      case 4:
        return 'What happened?'
      case 5:
        return 'Thank You'
      default:
        return ''
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
        <h2 className="text-2xl font-bold">{getStepTitle()}</h2>
        {step > 1 && (
          <Button
            variant="ghost"
            onClick={() => setStep(prev => prev - 1)}
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
        {getStepOptions().map((option) => (
          <Card
            key={option.id}
            className="p-6 cursor-pointer hover:bg-accent/20 transition-colors"
            onClick={() => option.action ? option.action() : handleSelection(String(step), option.id)}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-full bg-primary/10">
                {option.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{option.label}</h3>
                {option.description && (
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a Date</DialogTitle>
          </DialogHeader>
          <CalendarComponent
            mode="single"
            selected={new Date()}
            onSelect={(date) => {
              setShowCalendar(false)
              if (date) {
                handleSelection(String(step), 'other')
              }
            }}
            initialFocus
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

