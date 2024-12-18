import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DOCUMENTS_DIR = path.join(process.cwd(), 'data', 'documents')

// Get document by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(DOCUMENTS_DIR, `${params.id}.json`)
    const content = await fs.readFile(filePath, 'utf-8')
    const document = JSON.parse(content)

    return NextResponse.json(document)
  } catch (error) {
    console.error('Failed to get document:', error)
    return NextResponse.json(
      { error: 'Failed to get document' },
      { status: 404 }
    )
  }
}

// Update document
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(DOCUMENTS_DIR, `${params.id}.json`)
    const content = await fs.readFile(filePath, 'utf-8')
    const document = JSON.parse(content)

    const updates = await request.json()
    const updatedDocument = {
      ...document,
      ...updates,
      updatedAt: new Date()
    }

    await fs.writeFile(
      filePath,
      JSON.stringify(updatedDocument, null, 2)
    )

    return NextResponse.json(updatedDocument)
  } catch (error) {
    console.error('Failed to update document:', error)
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    )
  }
}

// Delete document
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(DOCUMENTS_DIR, `${params.id}.json`)
    await fs.unlink(filePath)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Failed to delete document:', error)
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    )
  }
}
