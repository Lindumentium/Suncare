'use client'

import * as React from 'react'
import { Plus, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface Goal {
  id: string
  text: string
  completed: boolean
}

export function ResidentGoals() {
  const [goals, setGoals] = React.useState<Goal[]>([
    { id: '1', text: 'Daily walk in the garden', completed: false },
    { id: '2', text: 'Join weekly social activities', completed: true },
    { id: '3', text: 'Regular physio exercises', completed: false },
  ])
  const [newGoal, setNewGoal] = React.useState('')

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        text: newGoal.trim(),
        completed: false
      }])
      setNewGoal('')
    }
  }

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ))
  }

  const removeGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id))
  }

  return (
    <Card className="p-4 h-full">
      <div className="flex flex-col h-full">
        <h3 className="font-semibold text-lg mb-4">Resident Goals</h3>
        
        <div className="flex gap-2 mb-4">
          <Input
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add new goal..."
            className="flex-1"
          />
          <Button size="sm" onClick={addGoal}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2 flex-1 overflow-auto">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-start gap-2 p-2 rounded-lg hover:bg-accent/20"
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => toggleGoal(goal.id)}
              >
                <Check className={`h-4 w-4 ${goal.completed ? 'text-green-500' : 'text-muted-foreground'}`} />
              </Button>
              <span className={`flex-1 text-sm ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                {goal.text}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-red-500 opacity-0 group-hover:opacity-100"
                onClick={() => removeGoal(goal.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Badge variant="secondary" className="text-xs">
            {goals.filter(g => g.completed).length} of {goals.length} completed
          </Badge>
        </div>
      </div>
    </Card>
  )
}

