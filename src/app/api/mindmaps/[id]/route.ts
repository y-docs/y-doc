import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const MINDMAPS_DIR = path.join(process.cwd(), 'data', 'mindmaps')

// Get mind map by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(MINDMAPS_DIR, `${params.id}.json`)
    const content = await fs.readFile(filePath, 'utf-8')
    const mindMap = JSON.parse(content)

    return NextResponse.json(mindMap)
  } catch (error) {
    console.error('Failed to get mind map:', error)
    return NextResponse.json(
      { error: 'Failed to get mind map' },
      { status: 404 }
    )
  }
}

// Update mind map
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(MINDMAPS_DIR, `${params.id}.json`)
    const content = await fs.readFile(filePath, 'utf-8')
    const mindMap = JSON.parse(content)

    const updates = await request.json()
    const updatedMindMap = {
      ...mindMap,
      ...updates,
      updatedAt: new Date()
    }

    await fs.writeFile(
      filePath,
      JSON.stringify(updatedMindMap, null, 2)
    )

    return NextResponse.json(updatedMindMap)
  } catch (error) {
    console.error('Failed to update mind map:', error)
    return NextResponse.json(
      { error: 'Failed to update mind map' },
      { status: 500 }
    )
  }
}

// Delete mind map
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(MINDMAPS_DIR, `${params.id}.json`)
    await fs.unlink(filePath)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Failed to delete mind map:', error)
    return NextResponse.json(
      { error: 'Failed to delete mind map' },
      { status: 500 }
    )
  }
}
