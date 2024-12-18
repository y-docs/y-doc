import React from 'react'
import { DocumentList } from './components/DocumentList'

export default function DocumentsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Documents</h1>
      </div>
      <DocumentList />
    </div>
  )
}
