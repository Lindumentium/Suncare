import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Resident {
  id: string
  name: string
  unitNumber: string
}

interface ResidentListProps {
  unitNumber: string
  searchTerm: string
}

export function ResidentList({ unitNumber, searchTerm }: ResidentListProps) {
  const [residents, setResidents] = useState<Resident[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResidents = async () => {
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

    fetchResidents()
  }, [unitNumber])

  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
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
  )
}

