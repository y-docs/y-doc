import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui'

interface OutlineProps {
  mindMap: any
}

interface OutlineNode {
  data: {
    text: string
  }
  children: OutlineNode[]
}

export default function Outline({ mindMap }: OutlineProps) {
  const [outline, setOutline] = useState<OutlineNode | null>(null)

  useEffect(() => {
    if (!mindMap) return

    const updateOutline = () => {
      const data = mindMap.getData()
      setOutline(data)
    }

    // Initial outline
    updateOutline()

    // Update outline when data changes
    mindMap.on('data_change', updateOutline)

    return () => {
      mindMap.off('data_change', updateOutline)
    }
  }, [mindMap])

  const renderNode = (node: OutlineNode, level: number = 0) => {
    return (
      <div key={node.data.text} style={{ paddingLeft: `${level * 16}px` }}>
        <div className="py-1 hover:bg-gray-100 rounded cursor-pointer">
          {node.data.text}
        </div>
        {node.children?.map(child => renderNode(child, level + 1))}
      </div>
    )
  }

  return (
    <Card className="m-4 p-4">
      <h3 className="text-sm font-medium mb-2">Outline</h3>
      <div className="max-h-48 overflow-y-auto">
        {outline && renderNode(outline)}
      </div>
    </Card>
  )
}
