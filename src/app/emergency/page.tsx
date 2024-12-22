'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, AlertTriangle, ArrowLeft } from 'lucide-react'

const EMERGENCY_CONTACTS = [
  {
    name: "Emergency Services",
    number: "000",
    description: "Police, Fire, Ambulance"
  },
  {
    name: "On-Site Staff",
    number: "1234 5678",
    description: "24/7 Emergency Response"
  },
  {
    name: "Facility Manager",
    number: "9876 5432",
    description: "For urgent facility issues"
  }
]

export default function EmergencyPage() {
  const router = useRouter()

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

        <Card className="p-6 border-red-200 bg-red-50">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4 text-red-600">
              <AlertTriangle className="h-12 w-12" />
              <h1 className="text-3xl font-bold">Emergency Contacts</h1>
            </div>

            <p className="text-xl text-center">
              If you or someone else needs immediate help,
              please contact one of these numbers:
            </p>

            <div className="grid gap-4">
              {EMERGENCY_CONTACTS.map((contact, index) => (
                <a
                  key={index}
                  href={`tel:${contact.number.replace(/\s/g, '')}`}
                  className="block"
                >
                  <Card className="p-6 hover:bg-accent transition-colors">
                    <div className="flex items-center gap-4">
                      <Phone className="h-8 w-8 text-primary" />
                      <div>
                        <h2 className="text-2xl font-bold">{contact.name}</h2>
                        <p className="text-xl font-mono">{contact.number}</p>
                        <p className="text-muted-foreground">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>

            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                These numbers are monitored 24/7.
              </p>
              <p className="text-muted-foreground">
                Don't hesitate to call if you need help.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

