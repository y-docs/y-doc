import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui'

interface HistoryProps {
  mindMap: any
}

interface HistoryRecord {
  type: string
  timestamp: number
}

export default function History({ mindMap }: HistoryProps) {
  const [history, setHistory] = useState<HistoryRecord[]>([])

  useEffect(() => {
    if (!mindMap) return

    const updateHistory = () => {
      const records = mindMap.getHistory()
      setHistory(records)
    }

    // Initial history
    updateHistory()

    // Update history when commands are executed
    mindMap.on('command_executed', updateHistory)

    return () => {
      mindMap.off('command_executed', updateHistory)
    }
  }, [mindMap])

  return (
    <Card className="m-4 p-4">
      <h3 className="text-sm font-medium mb-2">History</h3>
      <div className="max-h-48 overflow-y-auto space-y-2">
        {history.map((record, index) => (
          <div
            key={index}
            className="text-sm py-1 px-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <span className="font-medium">{record.type}</span>
            <span className="text-gray-500 ml-2">
              {new Date(record.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
