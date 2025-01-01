/*
 * @Author: Tarrency 760216236@qq.com
 * @Date: 2024-12-22 18:21:31
 * @LastEditors: Tarrency 760216236@qq.com
 * @LastEditTime: 2025-01-01 17:28:02
 * @FilePath: /y-doc/src/app/mind/[id]/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

"use client"

import React, { useEffect, useState } from 'react'
// import { useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'
import MindMapEditor from '../components/MindMapEditor'
import { Document } from '../../documents/types'

export default function MindPage() {
  // const searchParams = useSearchParams()
  const [mindMap, setMindMap] = useState<Document | null>(null)
  // const { id } = params
  const { id } = useParams()

  useEffect(() => {
    if (!id) return

    // const loadMindMap = async () => {
    //   try {
    //     const response = await fetch(`/api/mindmaps/${id}`)
    //     const data = await response.json()
    //     setMindMap(data)
    //   } catch (error) {
    //     console.error('Failed to load mind map:', error)
    //   }
    // }

    // loadMindMap()
  }, [id])

  if (!mindMap) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-screen">
      {/* <MindMapEditor initialData={mindMap.data} documentId={id} /> */}
    </div>
  )
}
