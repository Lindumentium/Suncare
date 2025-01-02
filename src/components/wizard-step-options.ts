import { Users, Clock, MapPin, MessageCircle, Eye, Home, Building, Coffee, ShoppingBag, Sun, Moon, CalendarIcon } from 'lucide-react'

export interface OptionCard {
  id: string
  icon: React.ReactNode
  label: string
  description?: string
}

export const getStepOptions = (step: number, setShowCalendar: () => void): OptionCard[] => {
  switch (step) {
    case 1: // Who
      return [
        { id: 'resident', icon: <Users className="h-8 w-8" />, label: 'Resident' },
        { id: 'staff', icon: <Users className="h-8 w-8" />, label: 'Staff Member' },
        { id: 'visitor', icon: <Users className="h-8 w-8" />, label: 'Visitor' },
      ]
    case 2: // When
      return [
        { id: 'now', icon: <Clock className="h-8 w-8" />, label: 'Just Now' },
        { 
          id: 'morning', 
          icon: <Sun className="h-8 w-8" />, 
          label: 'Morning',
          description: 'Between 6am - 12pm' 
        },
        { 
          id: 'lunch', 
          icon: <Coffee className="h-8 w-8" />, 
          label: 'Lunch Time',
          description: 'Between 12pm - 2pm' 
        },
        { 
          id: 'evening', 
          icon: <Moon className="h-8 w-8" />, 
          label: 'Evening',
          description: 'After 2pm' 
        },
        { 
          id: 'other', 
          icon: <CalendarIcon className="h-8 w-8" />, 
          label: 'Another Day',
          description: 'Select a specific date'
        },
      ]
    case 3: // Where
      return [
        { id: 'unit', icon: <Home className="h-8 w-8" />, label: 'Unit' },
        { id: 'common', icon: <Building className="h-8 w-8" />, label: 'Common Area' },
        { id: 'kitchen', icon: <Coffee className="h-8 w-8" />, label: 'Kitchen' },
        { id: 'offsite', icon: <MapPin className="h-8 w-8" />, label: 'Offsite' },
        { id: 'shops', icon: <ShoppingBag className="h-8 w-8" />, label: 'Shops' },
      ]
    case 4: // What & Why
      return [
        { 
          id: 'witnessed', 
          icon: <Eye className="h-8 w-8" />, 
          label: 'I Saw It Happen',
          description: 'I was there when it happened'
        },
        { 
          id: 'reported', 
          icon: <MessageCircle className="h-8 w-8" />, 
          label: 'Someone Told Me',
          description: 'I heard about it from others'
        },
      ]
    default:
      return []
  }
}

export const getStepTitle = (step: number): string => {
  switch (step) {
    case 1:
      return 'Who was involved?'
    case 2:
      return 'When did it happen?'
    case 3:
      return 'Where did it happen?'
    case 4:
      return 'What happened?'
    case 5:
      return 'Thank You'
    default:
      return ''
  }
}

