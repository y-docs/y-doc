import React from 'react';
import { FileList } from '@/components/FileList';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">我的文件</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <FileList />
      </div>
    </div>
  );
}
