import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const FILES_DIR = path.join(process.cwd(), 'data', 'files')

// Get file by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(FILES_DIR, `${params.id}.json`)
    const content = await fs.readFile(filePath, 'utf-8')
    const file = JSON.parse(content)

    return NextResponse.json(file)
  } catch (error) {
    console.error('Failed to get file:', error)
    return NextResponse.json(
      { error: 'Failed to get file' },
      { status: 404 }
    )
  }
}

// Update file
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(FILES_DIR, `${params.id}.json`)
    const content = await fs.readFile(filePath, 'utf-8')
    const file = JSON.parse(content)

    const updates = await request.json()
    const updatedFile = {
      ...file,
      ...updates,
      updatedAt: new Date()
    }

    await fs.writeFile(
      filePath,
      JSON.stringify(updatedFile, null, 2)
    )

    return NextResponse.json(updatedFile)
  } catch (error) {
    console.error('Failed to update file:', error)
    return NextResponse.json(
      { error: 'Failed to update file' },
      { status: 500 }
    )
  }
}

// Delete file
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(FILES_DIR, `${params.id}.json`)
    await fs.unlink(filePath)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Failed to delete file:', error)
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}
