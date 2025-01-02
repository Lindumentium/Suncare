import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface WitnessDetailsProps {
  value: string
  onChange: (value: string) => void
}

export function WitnessDetails({ value, onChange }: WitnessDetailsProps) {
  return (
    <div className="mt-4 space-y-4">
      <Label htmlFor="witness-details" className="text-lg">
        Please provide any additional details about what you saw:
      </Label>
      <Textarea
        id="witness-details"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

