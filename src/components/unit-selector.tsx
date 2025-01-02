import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface UnitSelectorProps {
  onSelect: (unit: string) => void
}

export function UnitSelector({ onSelect }: UnitSelectorProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleSelect = (unit: string) => {
    onSelect(unit)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select a Unit</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-2 mt-4">
          {Array.from({ length: 60 }, (_, i) => i + 1).map((unit) => (
            <Button
              key={unit}
              variant="outline"
              onClick={() => handleSelect(unit.toString())}
            >
              {unit}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

