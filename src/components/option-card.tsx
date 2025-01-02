import { Card } from '@/components/ui/card'
import { OptionCard } from './wizard-step-options'

interface OptionCardProps extends OptionCard {
  isSelected: boolean
  onClick: () => void
}

export function OptionCard({ icon, label, description, isSelected, onClick }: OptionCardProps) {
  return (
    <Card
      className={`p-6 cursor-pointer transition-colors ${
        isSelected ? 'bg-primary/10' : 'hover:bg-accent/20'
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-full bg-primary/10">
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{label}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </Card>
  )
}

