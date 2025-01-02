import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface ReportedIncidentDetailsProps {
  reporterName: string
  makeReport: string
  anonymous: string
  onReporterNameChange: (value: string) => void
  onMakeReportChange: (value: string) => void
  onAnonymousChange: (value: string) => void
}

export function ReportedIncidentDetails({
  reporterName,
  makeReport,
  anonymous,
  onReporterNameChange,
  onMakeReportChange,
  onAnonymousChange
}: ReportedIncidentDetailsProps) {
  return (
    <div className="mt-4 space-y-4">
      <div>
        <Label htmlFor="reporter-name" className="text-lg">Who told you about this?</Label>
        <Input
          id="reporter-name"
          className="mt-2"
          value={reporterName}
          onChange={(e) => onReporterNameChange(e.target.value)}
        />
      </div>
      <div>
        <Label className="text-lg">Would they like to make a report?</Label>
        <RadioGroup value={makeReport} onValueChange={onMakeReportChange}>
          <div className="flex items-center space-x-2 mt-2">
            <RadioGroupItem value="yes" id="make-report-yes" />
            <Label htmlFor="make-report-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="make-report-no" />
            <Label htmlFor="make-report-no">No</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label className="text-lg">Would they like to remain anonymous?</Label>
        <RadioGroup value={anonymous} onValueChange={onAnonymousChange}>
          <div className="flex items-center space-x-2 mt-2">
            <RadioGroupItem value="yes" id="anonymous-yes" />
            <Label htmlFor="anonymous-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="anonymous-no" />
            <Label htmlFor="anonymous-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

