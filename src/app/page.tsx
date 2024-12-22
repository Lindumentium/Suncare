'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wrench, Home, Heart, UserCircle } from 'lucide-react'
import { ReportTypeDialog } from '@/components/report-type-dialog'

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

        <p className="text-xs text-center text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </Card>

      <ReportTypeDialog
        isOpen={showReportDialog}
        onClose={() => setShowReportDialog(false)}
      />
    </div>
  )
}

