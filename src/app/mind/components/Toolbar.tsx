import React from 'react'
import { Button, Tooltip } from '@/components/ui'
import { 
  UndoIcon, 
  RedoIcon, 
  ZoomInIcon, 
  ZoomOutIcon,
  SaveIcon
} from '@/components/icons'

interface ToolbarProps {
  onUndo: () => void
  onRedo: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  hasUncommitted: boolean
}

export default function Toolbar({
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  hasUncommitted,
}: ToolbarProps) {
  return (
    <div className="w-12 border-r border-gray-200 bg-white flex flex-col items-center py-4 space-y-4">
      <Tooltip content="Undo" side="right">
        <Button
          variant="ghost"
          size="icon"
          onClick={onUndo}
        >
          <UndoIcon className="h-4 w-4" />
        </Button>
      </Tooltip>

      <Tooltip content="Redo" side="right">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRedo}
        >
          <RedoIcon className="h-4 w-4" />
        </Button>
      </Tooltip>

      <div className="h-px w-8 bg-gray-200" />

      <Tooltip content="Zoom In" side="right">
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
        >
          <ZoomInIcon className="h-4 w-4" />
        </Button>
      </Tooltip>

      <Tooltip content="Zoom Out" side="right">
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
        >
          <ZoomOutIcon className="h-4 w-4" />
        </Button>
      </Tooltip>

      <div className="h-px w-8 bg-gray-200" />

      <Tooltip content="Save" side="right">
        <Button
          variant="ghost"
          size="icon"
          className={hasUncommitted ? 'text-blue-500' : ''}
        >
          <SaveIcon className="h-4 w-4" />
        </Button>
      </Tooltip>
    </div>
  )
}
