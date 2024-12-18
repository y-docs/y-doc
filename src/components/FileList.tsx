"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Card, 
  Button, 
  Modal, 
  Input, 
  Select, 
  Space, 
  message 
} from 'antd'
import { 
  DeleteOutlined, 
  PlusOutlined,
  ApiOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import { File, FileType, FILE_TYPES } from '@/types/file'

const ICONS = {
  BrainIcon: ApiOutlined,
  FileTextIcon: FileTextOutlined,
}

export function FileList() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [newFileType, setNewFileType] = useState<FileType | undefined>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/files')
      const data = await response.json()
      setFiles(data)
    } catch (error) {
      message.error('获取文件列表失败')
    }
  }

  const handleCreateFile = async () => {
    if (!newFileName || !newFileType) {
      message.error('请填写完整信息')
      return
    }

    // 生成一个新的文件对象
    const newFile: File = {
      id: Math.random().toString(36).substr(2, 9),
      name: newFileName,
      type: newFileType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: FILE_TYPES[newFileType].defaultData
    }

    // 更新本地文件列表
    setFiles(prevFiles => [...prevFiles, newFile])
    
    // 重置表单并关闭弹窗
    setNewFileName('')
    setNewFileType(undefined)
    setIsCreateModalOpen(false)
    message.success('创建成功')
  }

  const handleDeleteFile = async (file: File) => {
    try {
      const response = await fetch(`/api/files/${file.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('删除文件失败')
      }

      setFiles(files.filter((f) => f.id !== file.id))
      message.success('删除成功')
    } catch (error) {
      message.error('删除文件失败')
    }
  }

  const handleOpenFile = (file: File) => {
    const config = FILE_TYPES[file.type]
    router.push(`${config.route}/${file.id}`)
  }

  return (
    <div>
      <div className="mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          新建文件
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => {
          console.log('xx', file, FILE_TYPES )
          const config = FILE_TYPES[file.type]
          const IconComponent = ICONS[config.icon as keyof typeof ICONS]

          return (
            <Card
              key={file.id}
              hoverable
              onClick={() => handleOpenFile(file)}
              extra={
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteFile(file)
                  }}
                />
              }
            >
              <Space>
                <IconComponent style={{ fontSize: '24px' }} />
                <div>
                  <div className="font-medium">{file.name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(file.updatedAt).toLocaleString('zh-CN')}
                  </div>
                </div>
              </Space>
            </Card>
          )
        })}
      </div>

      <Modal
        title="新建文件"
        open={isCreateModalOpen}
        onOk={handleCreateFile}
        onCancel={() => {
          setIsCreateModalOpen(false)
          setNewFileName('')
        }}
        confirmLoading={loading}
      >
        <div className="space-y-4">
          <div>
            <div className="mb-2">文件名称</div>
            <Input
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="请输入文件名称"
            />
          </div>
          <div>
            <div className="mb-2">文件类型</div>
            <Select
              value={newFileType}
              onChange={setNewFileType}
              style={{ width: '100%' }}
              placeholder="请选择文件类型"
            >
              <Select.Option value={FileType.MIND_MAP}>
                {FILE_TYPES[FileType.MIND_MAP].name}
              </Select.Option>
              <Select.Option value={FileType.DOCUMENT}>
                {FILE_TYPES[FileType.DOCUMENT].name}
              </Select.Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
