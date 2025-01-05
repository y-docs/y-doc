/*
 * @Author: Tarrency 760216236@qq.com
 * @Date: 2024-12-22 18:21:31
 * @LastEditors: Tarrency 760216236@qq.com
 * @LastEditTime: 2025-01-06 00:34:47
 * @FilePath: /y-doc/src/app/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'
import React, { useRef, useEffect } from 'react';
import MindMap from 'simple-mind-map' 
import { FileList } from '@/components/FileList';

// export default function HomePage() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">我的文件</h1>
//       </div>
//       <div className="bg-white rounded-lg shadow-sm p-6">
//         <FileList />
//       </div>
//     </div>
//   );
// }
export default function HomePage() {
  const mindMapContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(mindMapContainer.current);
    if (mindMapContainer.current) {
      const mindMap = new MindMap({
        el: mindMapContainer.current,
        data: {
            data: {
              text: '中心主题',
            },
            // children: []
        },
      });
      console.log(mindMap);
    }
  }, []);
  return (
      <div
      className="mindMapContainer"
      id="mindMapContainer"
      ref={mindMapContainer}
    ></div>
  );
}

