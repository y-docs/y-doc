import { useRef, useCallback, useState, useEffect } from 'react'
import MindMap from 'simple-mind-map'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

interface UseMindMapProps {
  initialData?: any
  documentId?: string
}

export function useMindMap({ initialData, documentId }: UseMindMapProps = {}) {
  const instance = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeNodes, setActiveNodes] = useState<any[]>([])
  const [hasUncommitted, setHasUncommitted] = useState(false)
  const router = useRouter()

  const initMindMap = useCallback((container: HTMLDivElement) => {
    if (!container) return

    instance.current = new MindMap({
      el: container,
      data: initialData || {
        data: {
          text: 'New Mind Map',
          uid: uuidv4(),
        },
        children: [],
      },
      theme: 'default',
      layout: 'mindMap',
      keypress: true,
      draggable: true,
      contextMenu: true,
      toolBar: true,
      nodeTextEdit: true,
      exportPng: true,
      exportPdf: true,
      exportSvg: true,
      shortcut: true,
    })

    // Register event listeners
    instance.current.on('node_active', (nodes: any[]) => {
      setActiveNodes(nodes)
    })

    instance.current.on('data_change', () => {
      setHasUncommitted(true)
    })

    // Save data periodically
    const saveInterval = setInterval(async () => {
      if (documentId && hasUncommitted) {
        try {
          await fetch(`/api/documents/${documentId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: instance.current.getData()
            }),
          })
          setHasUncommitted(false)
        } catch (error) {
          console.error('Failed to save mind map:', error)
        }
      }
    }, 5000)

    return () => {
      clearInterval(saveInterval)
    }
  }, [initialData, documentId, hasUncommitted])

  const destroyMindMap = useCallback(() => {
    if (instance.current) {
      instance.current.destroy()
      instance.current = null
    }
  }, [])

  const handleUndo = useCallback(() => {
    instance.current?.execCommand('BACK')
  }, [])

  const handleRedo = useCallback(() => {
    instance.current?.execCommand('FORWARD')
  }, [])

  const handleZoomIn = useCallback(() => {
    instance.current?.execCommand('ZOOM_IN')
  }, [])

  const handleZoomOut = useCallback(() => {
    instance.current?.execCommand('ZOOM_OUT')
  }, [])

  const handleAddChild = useCallback(() => {
    instance.current?.execCommand('INSERT_CHILD_NODE')
  }, [])

  const handleAddSibling = useCallback(() => {
    instance.current?.execCommand('INSERT_NODE')
  }, [])

  const handleRemoveNode = useCallback(() => {
    instance.current?.execCommand('REMOVE_NODE')
  }, [])

  return {
    instance: instance.current,
    containerRef,
    activeNodes,
    hasUncommitted,
    initMindMap,
    destroyMindMap,
    handleUndo,
    handleRedo,
    handleZoomIn,
    handleZoomOut,
    handleAddChild,
    handleAddSibling,
    handleRemoveNode,
  }
}
