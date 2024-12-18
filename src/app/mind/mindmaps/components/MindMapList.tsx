import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Card,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
  Label
} from '@/components/ui'
import { 
  FileIcon, 
  TrashIcon, 
  PlusIcon 
} from '@/components/icons'

interface MindMap {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export function MindMapList() {
  const router = useRouter()
  const [mindMaps, setMindMaps] = useState<MindMap[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newMindMapName, setNewMindMapName] = useState('')

  useEffect(() => {
    loadMindMaps()
  }, [])

  const loadMindMaps = async () => {
    try {
      const response = await fetch('/api/mindmaps')
      const data = await response.json()
      setMindMaps(data)
    } catch (error) {
      console.error('Failed to load mind maps:', error)
    }
  }

  const handleCreate = async () => {
    if (!newMindMapName.trim()) return

    try {
      const response = await fetch('/api/mindmaps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newMindMapName }),
      })

      if (response.ok) {
        const newMindMap = await response.json()
        setMindMaps([...mindMaps, newMindMap])
        setIsCreateDialogOpen(false)
        setNewMindMapName('')
      }
    } catch (error) {
      console.error('Failed to create mind map:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/mindmaps/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setMindMaps(mindMaps.filter(map => map.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete mind map:', error)
    }
  }

  const handleOpen = (id: string) => {
    router.push(`/mind?id=${id}`)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Create New Card */}
        <Card
          className="p-6 border-2 border-dashed border-gray-200 hover:border-gray-300 cursor-pointer"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <div className="flex flex-col items-center justify-center h-40">
            <PlusIcon className="h-12 w-12 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">Create New Mind Map</span>
          </div>
        </Card>

        {/* Mind Map Cards */}
        {mindMaps.map((mindMap) => (
          <Card key={mindMap.id} className="p-6">
            <div className="flex items-start justify-between">
              <div 
                className="flex-1 cursor-pointer" 
                onClick={() => handleOpen(mindMap.id)}
              >
                <div className="flex items-center">
                  <FileIcon className="h-6 w-6 text-blue-500" />
                  <h3 className="ml-2 text-lg font-medium">{mindMap.name}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Last modified: {new Date(mindMap.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(mindMap.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Mind Map</DialogTitle>
            <DialogDescription>
              Enter a name for your new mind map.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newMindMapName}
                onChange={(e) => setNewMindMapName(e.target.value)}
                placeholder="My Mind Map"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
