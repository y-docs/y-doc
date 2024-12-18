import React from 'react'
import { MindMapList } from './components/MindMapList'

export default function MindMapsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Mind Maps</h1>
      </div>
      <MindMapList />
    </div>
  )
}
