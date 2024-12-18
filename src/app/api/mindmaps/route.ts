import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import path from 'path'

const MINDMAPS_DIR = path.join(process.cwd(), 'data', 'mindmaps')

// Ensure the mindmaps directory exists
async function ensureDir() {
  try {
    await fs.access(MINDMAPS_DIR)
  } catch {
    await fs.mkdir(MINDMAPS_DIR, { recursive: true })
  }
}

// Get list of mind maps
export async function GET() {
  try {
    await ensureDir()
    
    const files = await fs.readdir(MINDMAPS_DIR)
    const mindMaps = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(
          path.join(MINDMAPS_DIR, file),
          'utf-8'
        )
        return JSON.parse(content)
      })
    )

    return NextResponse.json(mindMaps)
  } catch (error) {
    console.error('Failed to get mind maps:', error)
    return NextResponse.json(
      { error: 'Failed to get mind maps' },
      { status: 500 }
    )
  }
}

// Create new mind map
export async function POST(request: Request) {
  try {
    await ensureDir()

    const { name } = await request.json()
    
    const mindMap = {
      id: uuidv4(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      data: {
        data: {
          text: name,
        },
        children: []
      }
    }

    await fs.writeFile(
      path.join(MINDMAPS_DIR, `${mindMap.id}.json`),
      JSON.stringify(mindMap, null, 2)
    )

    return NextResponse.json(mindMap)
  } catch (error) {
    console.error('Failed to create mind map:', error)
    return NextResponse.json(
      { error: 'Failed to create mind map' },
      { status: 500 }
    )
  }
}
