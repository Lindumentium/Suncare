import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CommonAreaSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function CommonAreaSelector({ value, onChange }: CommonAreaSelectorProps) {
  return (
    <div className="mt-4 space-y-4">
      <Label htmlFor="common-area" className="text-lg">Which common area?</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger id="common-area" className="text-lg">
          <SelectValue placeholder="Select common area" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="walkways">Walkways</SelectItem>
          <SelectItem value="carpark">Car Park</SelectItem>
          <SelectItem value="mailboxes">Mailboxes</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

