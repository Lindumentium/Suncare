'use client'

import * as React from 'react'
import { AlertTriangle, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

export function IncidentReportForm({ isEditable = false }: { isEditable?: boolean }) {
  const [incidentType, setIncidentType] = React.useState<string>('')
  const [showMedical, setShowMedical] = React.useState(false)
  const [showBehavioral, setShowBehavioral] = React.useState(false)

  const handleIncidentTypeChange = (value: string) => {
    setIncidentType(value)
    setShowMedical(value === 'medical')
    setShowBehavioral(value === 'behavioral')
  }

  return (
    <Card className="p-6">
      <form className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="incident-type">Type of Incident</Label>
            <Select
              disabled={!isEditable}
              onValueChange={handleIncidentTypeChange}
              value={incidentType}
            >
              <SelectTrigger id="incident-type">
                <SelectValue placeholder="Select incident type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical">Medical Incident</SelectItem>
                <SelectItem value="behavioral">Behavioral Incident</SelectItem>
                <SelectItem value="facility">Facility Related</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Where did the incident occur?"
              readOnly={!isEditable}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what happened..."
              className="min-h-[100px]"
              readOnly={!isEditable}
            />
          </div>

          {showMedical && (
            <Collapsible className="space-y-2">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="flex w-full justify-between">
                  Medical Details
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="injury-type">Type of Injury/Medical Issue</Label>
                  <Input
                    id="injury-type"
                    placeholder="Describe the injury or medical issue"
                    readOnly={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="first-aid">First Aid Provided</Label>
                  <Textarea
                    id="first-aid"
                    placeholder="Describe any first aid or immediate care provided"
                    readOnly={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medical-attention">Medical Attention Required</Label>
                  <Select disabled={!isEditable}>
                    <SelectTrigger id="medical-attention">
                      <SelectValue placeholder="Select required medical attention" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None required</SelectItem>
                      <SelectItem value="first-aid">First aid only</SelectItem>
                      <SelectItem value="doctor">Doctor visit required</SelectItem>
                      <SelectItem value="emergency">Emergency services required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {showBehavioral && (
            <Collapsible className="space-y-2">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="flex w-full justify-between">
                  Behavioral Details
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trigger">Trigger/Cause</Label>
                  <Textarea
                    id="trigger"
                    placeholder="What triggered this incident?"
                    readOnly={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intervention">Staff Intervention</Label>
                  <Textarea
                    id="intervention"
                    placeholder="What actions did staff take?"
                    readOnly={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="follow-up">Required Follow-up</Label>
                  <Select disabled={!isEditable}>
                    <SelectTrigger id="follow-up">
                      <SelectValue placeholder="Select required follow-up" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No follow-up needed</SelectItem>
                      <SelectItem value="monitor">Monitor situation</SelectItem>
                      <SelectItem value="meeting">Family meeting required</SelectItem>
                      <SelectItem value="professional">Professional intervention needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          <div className="space-y-2">
            <Label htmlFor="witnesses">Witnesses</Label>
            <Input
              id="witnesses"
              placeholder="Names of any witnesses"
              readOnly={!isEditable}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-notes">Additional Notes</Label>
            <Textarea
              id="additional-notes"
              placeholder="Any additional information..."
              readOnly={!isEditable}
            />
          </div>
        </div>

        {isEditable && (
          <div className="flex gap-4">
            <Button type="submit">Submit Report</Button>
            <Button type="button" variant="outline">Cancel</Button>
          </div>
        )}
      </form>
    </Card>
  )
}

