'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Note {
  id: string
  text: string
  author: string
  authorInitials: string
  timestamp: Date
}

export function ResidentNotes() {
  const [notes, setNotes] = React.useState<Note[]>([
    {
      id: '1',
      text: 'Had a great conversation about family photos today. Resident was in high spirits.',
      author: 'Sarah Wilson',
      authorInitials: 'SW',
      timestamp: new Date('2024-01-20T10:30:00')
    },
    {
      id: '2',
      text: 'Medication schedule adjusted as per doctor\'s new instructions.',
      author: 'Mike Thompson',
      authorInitials: 'MT',
      timestamp: new Date('2024-01-19T15:45:00')
    }
  ])
  const [newNote, setNewNote] = React.useState('')

  const addNote = () => {
    if (newNote.trim()) {
      setNotes(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        text: newNote.trim(),
        author: 'Current Staff', // This would come from auth context in a real app
        authorInitials: 'CS',
        timestamp: new Date()
      }, ...prev])
      setNewNote('')
    }
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-lg mb-4">Resident Notes</h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note about the resident..."
            className="min-h-[100px]"
          />
          <Button className="shrink-0" onClick={addNote}>
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>

        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="flex gap-4 p-4 rounded-lg bg-accent/20">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg`} />
                  <AvatarFallback>{note.authorInitials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{note.author}</p>
                    <time className="text-xs text-muted-foreground">
                      {format(note.timestamp, 'PPp')}
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground">{note.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  )
}

