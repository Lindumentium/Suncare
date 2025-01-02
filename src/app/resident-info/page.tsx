'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Moon, Sun, Phone } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MedicationCard } from '@/components/medication-card'

const MEDICATIONS = [
  {
    name: "Aspirin",
    dosage: "81mg",
    frequency: "Once daily",
    times: ["8:00 AM"],
    missedDoses: 0,
    lastTaken: "Today at 8:05 AM"
  },
  {
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    times: ["9:00 AM", "9:00 PM"],
    missedDoses: 1,
    lastTaken: "Yesterday at 9:00 PM"
  },
  {
    name: "Vitamin D",
    dosage: "2000 IU",
    frequency: "Once daily",
    times: ["8:00 AM"],
    missedDoses: 0,
    lastTaken: "Today at 8:05 AM"
  },
  {
    name: "Calcium",
    dosage: "500mg",
    frequency: "Twice daily",
    times: ["8:00 AM", "8:00 PM"],
    missedDoses: 0,
    lastTaken: "Today at 8:05 AM"
  }
]

export default function ResidentInfoPage() {
  const router = useRouter()
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark')
  }

  const handleLogout = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-xl font-semibold">Resident Profile</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="space-y-6">
          {/* Resident Information Card */}
          <Card className="p-6 bg-primary/5">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src="/placeholder.svg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 grid gap-4">
                <div>
                  <h2 className="text-2xl font-bold">John Doe</h2>
                  <p className="text-muted-foreground">Unit #123</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-sm">Emergency Contact</Label>
                    <p className="text-sm font-medium">Jane Doe (Daughter)</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Phone className="mr-1 h-3 w-3" />
                      (555) 123-4567
                    </p>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm">Medical Conditions</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Diabetes Type 2
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Hypertension
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm">Mobility</Label>
                    <p className="text-sm text-muted-foreground">
                      Uses walker for longer distances
                    </p>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm">Dietary Requirements</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Low Sodium
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Diabetic Diet
                      </Badge>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-fit">
                  Edit Profile
                </Button>
              </div>
            </div>
          </Card>

          {/* Medications Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Medications</h3>
              <Button variant="outline" size="sm">
                Add Medication
              </Button>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MEDICATIONS.map((medication, index) => (
                <MedicationCard
                  key={index}
                  {...medication}
                  isEditable={true}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Independent Living CRM. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

