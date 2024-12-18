import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import path from 'path'
import { File, FILE_TYPES } from '@/types/file'

const FILES_DIR = path.join(process.cwd(), 'data', 'files')

// Ensure the files directory exists
async function ensureDir() {
  try {
    await fs.access(FILES_DIR)
  } catch {
    await fs.mkdir(FILES_DIR, { recursive: true })
  }
}

// Get list of files
export async function GET() {
  try {
    await ensureDir()
    
    const files = await fs.readdir(FILES_DIR)
    const documents = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(
          path.join(FILES_DIR, file),
          'utf-8'
        )
        return JSON.parse(content)
      })
    )

    return NextResponse.json(documents)
  } catch (error) {
    console.error('Failed to get files:', error)
    return NextResponse.json(
      { error: 'Failed to get files' },
      { status: 500 }
    )
  }
}

// Create new file
export async function POST(request: Request) {
  try {
    await ensureDir()

    const { name, type } = await request.json()
    const config = FILE_TYPES[type]
    
    if (!config) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      )
    }

    const file: File = {
      id: uuidv4(),
      name,
      type,
      createdAt: new Date(),
      updatedAt: new Date(),
      data: config.defaultData
    }

    await fs.writeFile(
      path.join(FILES_DIR, `${file.id}.json`),
      JSON.stringify(file, null, 2)
    )

    return NextResponse.json(file)
  } catch (error) {
    console.error('Failed to create file:', error)
    return NextResponse.json(
      { error: 'Failed to create file' },
      { status: 500 }
    )
  }
}
