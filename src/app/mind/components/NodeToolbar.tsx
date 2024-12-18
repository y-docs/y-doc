import React from 'react'
import { Button, Tooltip } from '@/components/ui'
import { 
  PlusIcon, 
  PlusCircleIcon, 
  TrashIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ColorWheelIcon
} from '@/components/icons'

interface NodeToolbarProps {
  activeNodes: any[]
  onAddChild: () => void
  onAddSibling: () => void
  onRemove: () => void
}

export default function NodeToolbar({
  activeNodes,
  onAddChild,
  onAddSibling,
  onRemove,
}: NodeToolbarProps) {
  const hasActiveNode = activeNodes.length > 0

  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center px-4 space-x-4">
      <div className="space-x-2">
        <Tooltip content="Add Child Node">
          <Button
            variant="ghost"
            size="icon"
            onClick={onAddChild}
            disabled={!hasActiveNode}
          >
            <PlusCircleIcon className="h-4 w-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Add Sibling Node">
          <Button
            variant="ghost"
            size="icon"
            onClick={onAddSibling}
            disabled={!hasActiveNode}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Remove Node">
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            disabled={!hasActiveNode}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
      </div>

      <div className="h-8 w-px bg-gray-200" />

      <div className="space-x-2">
        <Tooltip content="Bold">
          <Button
            variant="ghost"
            size="icon"
            disabled={!hasActiveNode}
          >
            <BoldIcon className="h-4 w-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Italic">
          <Button
            variant="ghost"
            size="icon"
            disabled={!hasActiveNode}
          >
            <ItalicIcon className="h-4 w-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Underline">
          <Button
            variant="ghost"
            size="icon"
            disabled={!hasActiveNode}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
      </div>

      <div className="h-8 w-px bg-gray-200" />

      <div className="space-x-2">
        <Tooltip content="Node Color">
          <Button
            variant="ghost"
            size="icon"
            disabled={!hasActiveNode}
          >
            <ColorWheelIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}
