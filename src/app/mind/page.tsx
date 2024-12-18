import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import MindMapEditor from './components/MindMapEditor'
import { Document } from '../documents/types'

export default function MindPage() {
  const searchParams = useSearchParams()
  const [mindMap, setMindMap] = useState<Document | null>(null)
  const id = searchParams.get('id')

  useEffect(() => {
    if (!id) return

    const loadMindMap = async () => {
      try {
        const response = await fetch(`/api/documents/${id}`)
        const data = await response.json()
        setMindMap(data)
      } catch (error) {
        console.error('Failed to load mind map:', error)
      }
    }

    loadMindMap()
  }, [id])

  if (!mindMap) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-screen">
      <MindMapEditor initialData={mindMap.data} documentId={id} />
    </div>
  )
}
