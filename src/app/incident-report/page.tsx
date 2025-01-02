'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { VisualIncidentWizard } from '@/components/visual-incident-wizard'

export default function IncidentReportPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-4xl py-8">
        <Card className="p-6 shadow-lg">
          <VisualIncidentWizard />
        </Card>
      </main>
    </div>
  )
}

