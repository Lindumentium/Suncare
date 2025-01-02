'use client'

import { useRouter } from 'next/navigation'
import { AlertCircle, Wrench, Users, UserPlus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ReportTypeDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function ReportTypeDialog({ isOpen, onClose }: ReportTypeDialogProps) {
  const router = useRouter()

  const handleSelection = (type: 'incident' | 'maintenance' | 'residents' | 'occupancy') => {
    onClose()
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
    <Dialog open={isOpen} onOpenChange={onClose}>
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
  )
}

