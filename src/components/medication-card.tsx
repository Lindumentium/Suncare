import { Clock, AlertCircle, Check, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface MedicationCardProps {
  name: string
  dosage: string
  frequency: string
  times: string[]
  missedDoses?: number
  lastTaken?: string
  isEditable?: boolean
}

export function MedicationCard({
  name,
  dosage,
  frequency,
  times,
  missedDoses = 0,
  lastTaken,
  isEditable
}: MedicationCardProps) {
  return (
    <Card className="flex flex-col p-4 bg-card hover:bg-accent/5 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">{dosage}</p>
        </div>
        <Badge variant={missedDoses > 0 ? "destructive" : "secondary"} className="ml-2">
          {missedDoses > 0 ? `${missedDoses} missed` : 'On track'}
        </Badge>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          <span>{frequency}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {times.map((time, index) => (
            <Badge key={index} variant="outline" className="bg-primary/5">
              {time}
            </Badge>
          ))}
        </div>

        {lastTaken && (
          <p className="text-xs text-muted-foreground flex items-center">
            <Check className="mr-1 h-3 w-3" />
            Last taken: {lastTaken}
          </p>
        )}
      </div>
    </Card>
  )
}

