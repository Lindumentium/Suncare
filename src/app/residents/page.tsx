'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Resident {
  id: string
  name: string
  unitNumber: string
}

export default function ResidentsPage() {
  const router = useRouter()
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [residents, setResidents] = useState<Resident[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUnitSelectorOpen, setIsUnitSelectorOpen] = useState(true)

  useEffect(() => {
    if (selectedUnit) {
      fetchResidents(selectedUnit)
    }
  }, [selectedUnit])

  const fetchResidents = async (unitNumber: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/residents?unitNumber=${unitNumber}`)
      if (!response.ok) {
        throw new Error('Failed to fetch residents')
      }
      const data = await response.json()
      setResidents(data)
    } catch (err) {
      setError('Failed to load residents. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnitSelection = (unit: string) => {
    setSelectedUnit(unit)
    setIsUnitSelectorOpen(false)
  }

  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resident Information</h1>
      {!selectedUnit ? (
        <Dialog open={isUnitSelectorOpen} onOpenChange={setIsUnitSelectorOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Select a Unit</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {Array.from({ length: 60 }, (_, i) => i + 1).map((unit) => (
                <Button
                  key={unit}
                  variant="outline"
                  onClick={() => handleUnitSelection(unit.toString())}
                >
                  {unit}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <Button onClick={() => setIsUnitSelectorOpen(true)}>Change Unit</Button>
            <Input
              type="text"
              placeholder="Search residents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="space-y-4">
              {filteredResidents.map(resident => (
                <Card key={resident.id} className="p-4 flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt={resident.name} />
                    <AvatarFallback>{resident.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{resident.name}</h3>
                    <p className="text-sm text-muted-foreground">Unit {resident.unitNumber}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

