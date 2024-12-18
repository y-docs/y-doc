export enum FileType {
  MIND_MAP = 'mindmap',
  DOCUMENT = 'document'
}

export interface File {
  id: string
  name: string
  type: FileType
  createdAt: string
  updatedAt: string
  data: any
}

export interface FileTypeConfig {
  type: FileType
  name: string
  description: string
  icon: 'BrainIcon' | 'FileTextIcon'
  route: string
  defaultData: any
}

export const FILE_TYPES: Record<FileType, FileTypeConfig> = {
  [FileType.MIND_MAP]: {
    type: FileType.MIND_MAP,
    name: '脑图',
    description: '创建思维导图，头脑风暴',
    icon: 'BrainIcon',
    route: '/mind',
    defaultData: {
      data: {
        text: '新建脑图'
      },
      children: []
    }
  },
  [FileType.DOCUMENT]: {
    type: FileType.DOCUMENT,
    name: '文档',
    description: '创建和编辑文本文档',
    icon: 'FileTextIcon',
    route: '/doc',
    defaultData: {
      content: ''
    }
  }
}
