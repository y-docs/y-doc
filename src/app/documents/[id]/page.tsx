/*
 * @Author: Tarrency 760216236@qq.com
 * @Date: 2024-12-22 18:21:31
 * @LastEditors: Tarrency 760216236@qq.com
 * @LastEditTime: 2024-12-29 18:49:52
 * @FilePath: /y-doc/src/app/documents/[id]/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { DocumentList } from '../components/DocumentList'

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
