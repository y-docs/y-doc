import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import path from 'path'
import { Document, DOCUMENT_TYPES } from '@/app/documents/types'

const DOCUMENTS_DIR = path.join(process.cwd(), 'data', 'documents')

// Ensure the documents directory exists
async function ensureDir() {
  try {
    await fs.access(DOCUMENTS_DIR)
  } catch {
    await fs.mkdir(DOCUMENTS_DIR, { recursive: true })
  }
}

// Get list of documents
export async function GET() {
  try {
    await ensureDir()
    
    const files = await fs.readdir(DOCUMENTS_DIR)
    const documents = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(
          path.join(DOCUMENTS_DIR, file),
          'utf-8'
        )
        return JSON.parse(content)
      })
    )

    return NextResponse.json(documents)
  } catch (error) {
    console.error('Failed to get documents:', error)
    return NextResponse.json(
      { error: 'Failed to get documents' },
      { status: 500 }
    )
  }
}

// Create new document
export async function POST(request: Request) {
  try {
    await ensureDir()

    const { name, type } = await request.json()
    const config = DOCUMENT_TYPES[type]
    
    if (!config) {
      return NextResponse.json(
        { error: 'Invalid document type' },
        { status: 400 }
      )
    }

    const document: Document = {
      id: uuidv4(),
      name,
      type,
      createdAt: new Date(),
      updatedAt: new Date(),
      data: config.defaultData
    }

    await fs.writeFile(
      path.join(DOCUMENTS_DIR, `${document.id}.json`),
      JSON.stringify(document, null, 2)
    )

    return NextResponse.json(document)
  } catch (error) {
    console.error('Failed to create document:', error)
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    )
  }
}
