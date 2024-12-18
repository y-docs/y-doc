import React, { useEffect, useRef } from 'react'
import { Card } from '@/components/ui'

interface NavigatorProps {
  mindMap: any
}

export default function Navigator({ mindMap }: NavigatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mindMap || !containerRef.current) return

    // Initialize navigator
    mindMap.initNavigator(containerRef.current)

    return () => {
      mindMap.destroyNavigator()
    }
  }, [mindMap])

  return (
    <Card className="m-4 p-4">
      <h3 className="text-sm font-medium mb-2">Navigator</h3>
      <div 
        className="w-full h-32" 
        ref={containerRef} 
      />
    </Card>
  )
}
