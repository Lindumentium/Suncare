'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wrench, Home, Heart, UserCircle, Users, AlertCircle, UserPlus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)

  const handleLogin = (role: 'trade' | 'resident' | 'support' | 'staff') => {
    setIsLoading(true)
    // Simulate login delay
    setTimeout(() => {
      if (role === 'staff') {
        setShowReportDialog(true)
      } else if (role === 'trade') {
        router.push('/maintenance')
      } else if (role === 'support') {
        router.push('/incident-check')
      } else {
        router.push('/incident-check')
      }
      setIsLoading(false)
    }, 500)
  }

  const handleUpdateOccupancy = () => {
    router.push('/occupancy')
  }

  const handleSelection = (type: 'incident' | 'maintenance' | 'residents' | 'occupancy') => {
    setShowReportDialog(false)
    if (type === 'incident') {
      router.push('/incident-check')
    } else if (type === 'maintenance') {
      router.push('/maintenance')
    } else if (type === 'residents') {
      router.push('/residents')
    } else if (type === 'occupancy') {
      router.push('/occupancy')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-muted-foreground">
            Please select how you would like to proceed
          </p>
        </div>

        <div className="grid gap-4">
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2"
            onClick={() => handleLogin('trade')}
            disabled={isLoading}
          >
            <Wrench className="h-8 w-8 text-primary" />
            <span className="font-medium">Trade Services</span>
            <span className="text-xs text-muted-foreground">
              Maintenance and service providers
            </span>
          </Button>

          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2"
            onClick={() => handleLogin('resident')}
            disabled={isLoading}
          >
            <Home className="h-8 w-8 text-primary" />
            <span className="font-medium">Resident</span>
            <span className="text-xs text-muted-foreground">
              Access resident services and support
            </span>
          </Button>

          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2"
            onClick={() => handleLogin('support')}
            disabled={isLoading}
          >
            <Heart className="h-8 w-8 text-primary" />
            <span className="font-medium">Support Worker</span>
            <span className="text-xs text-muted-foreground">
              Care and support services
            </span>
          </Button>

          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2"
            onClick={() => handleLogin('staff')}
            disabled={isLoading}
          >
            <UserCircle className="h-8 w-8 text-primary" />
            <span className="font-medium">Staff Member</span>
            <span className="text-xs text-muted-foreground">
              Access resident information and reports
            </span>
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={handleUpdateOccupancy}
          >
            <Users className="h-4 w-4 mr-2" />
            Update Occupancy
          </Button>
        </div>
      </Card>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              What would you like to do?
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="h-32 flex flex-col items-center justify-center gap-4"
              onClick={() => handleSelection('incident')}
            >
              <AlertCircle className="h-12 w-12 text-primary" />
              <div className="space-y-1 text-center">
                <h3 className="font-semibold text-xl">Tell Us Something</h3>
                <p className="text-sm text-muted-foreground">
                  Report an incident or concern
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-32 flex flex-col items-center justify-center gap-4"
              onClick={() => handleSelection('maintenance')}
            >
              <Wrench className="h-12 w-12 text-primary" />
              <div className="space-y-1 text-center">
                <h3 className="font-semibold text-xl">Something is Broken</h3>
                <p className="text-sm text-muted-foreground">
                  Report maintenance or repair needs
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-32 flex flex-col items-center justify-center gap-4"
              onClick={() => handleSelection('residents')}
            >
              <Users className="h-12 w-12 text-primary" />
              <div className="space-y-1 text-center">
                <h3 className="font-semibold text-xl">Residents</h3>
                <p className="text-sm text-muted-foreground">
                  View resident information
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-32 flex flex-col items-center justify-center gap-4"
              onClick={() => handleSelection('occupancy')}
            >
              <UserPlus className="h-12 w-12 text-primary" />
              <div className="space-y-1 text-center">
                <h3 className="font-semibold text-xl">Update Occupancy</h3>
                <p className="text-sm text-muted-foreground">
                  Add or update resident information
                </p>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

