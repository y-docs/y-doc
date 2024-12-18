import React, { useEffect } from 'react'
import { useMindMap } from '../hooks/useMindMap'
import Toolbar from './Toolbar'
import NodeToolbar from './NodeToolbar'
import Navigator from './Navigator'
import Outline from './Outline'
import History from './History'

interface MindMapEditorProps {
  initialData?: any
  documentId?: string
}

export default function MindMapEditor({ initialData, documentId }: MindMapEditorProps) {
  const {
    instance,
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
  } = useMindMap({ initialData, documentId })

  useEffect(() => {
    if (containerRef.current) {
      initMindMap(containerRef.current)
    }

    return () => {
      destroyMindMap()
    }
  }, [initMindMap, destroyMindMap])

  return (
    <div className="flex h-full">
      {/* Left toolbar */}
      <Toolbar
        onUndo={handleUndo}
        onRedo={handleRedo}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        hasUncommitted={hasUncommitted}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Node toolbar */}
        <NodeToolbar
          activeNodes={activeNodes}
          onAddChild={handleAddChild}
          onAddSibling={handleAddSibling}
          onRemove={handleRemoveNode}
        />

        {/* Mind map container */}
        <div 
          className="w-full h-full bg-white"
          ref={containerRef}
          id="mindMapContainer"
        />
      </div>

      {/* Right sidebar */}
      <div className="w-64 border-l border-gray-200">
        <Navigator mindMap={instance} />
        <Outline mindMap={instance} />
        <History mindMap={instance} />
      </div>
    </div>
  )
}
