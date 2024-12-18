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
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { 
  FileIcon, 
  TrashIcon, 
  PlusIcon,
  BrainIcon,
  FileTextIcon,
  PresentationIcon
} from '@/components/icons'
import { Document, DocumentType, DOCUMENT_TYPES } from '../types'

const ICONS = {
  BrainIcon,
  FileTextIcon,
  PresentationIcon
}

export function DocumentList() {
  const router = useRouter()
  const [documents, setDocuments] = useState<Document[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newDocName, setNewDocName] = useState('')
  const [selectedType, setSelectedType] = useState<DocumentType>(DocumentType.MIND_MAP)

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const response = await fetch('/api/documents')
      const data = await response.json()
      setDocuments(data)
    } catch (error) {
      console.error('Failed to load documents:', error)
    }
  }

  const handleCreate = async () => {
    if (!newDocName.trim()) return

    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: newDocName,
          type: selectedType,
        }),
      })

      if (response.ok) {
        const newDoc = await response.json()
        setDocuments([...documents, newDoc])
        setIsCreateDialogOpen(false)
        setNewDocName('')
      }
    } catch (error) {
      console.error('Failed to create document:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setDocuments(documents.filter(doc => doc.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete document:', error)
    }
  }

  const handleOpen = (document: Document) => {
    const config = DOCUMENT_TYPES[document.type]
    router.push(`${config.route}?id=${document.id}`)
  }

  const getIcon = (iconName: string) => {
    const Icon = ICONS[iconName as keyof typeof ICONS]
    return Icon ? <Icon className="h-6 w-6" /> : <FileIcon className="h-6 w-6" />
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
            <span className="mt-2 text-sm text-gray-500">Create New Document</span>
          </div>
        </Card>

        {/* Document Cards */}
        {documents.map((doc) => (
          <Card key={doc.id} className="p-6">
            <div className="flex items-start justify-between">
              <div 
                className="flex-1 cursor-pointer" 
                onClick={() => handleOpen(doc)}
              >
                <div className="flex items-center">
                  {getIcon(DOCUMENT_TYPES[doc.type].icon)}
                  <div className="ml-2">
                    <h3 className="text-lg font-medium">{doc.name}</h3>
                    <p className="text-sm text-gray-500">
                      {DOCUMENT_TYPES[doc.type].name}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Last modified: {new Date(doc.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(doc.id)}
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
            <DialogTitle>Create New Document</DialogTitle>
            <DialogDescription>
              Choose a type and enter a name for your new document.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value as DocumentType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a document type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(DOCUMENT_TYPES).map((config) => (
                    <SelectItem key={config.type} value={config.type}>
                      <div className="flex items-center">
                        {getIcon(config.icon)}
                        <span className="ml-2">{config.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                placeholder={`New ${DOCUMENT_TYPES[selectedType].name}`}
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
