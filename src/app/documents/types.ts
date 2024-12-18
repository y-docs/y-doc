export enum DocumentType {
  MIND_MAP = 'mindmap',
  DOCUMENT = 'document',
  PRESENTATION = 'presentation',
}

export interface Document {
  id: string
  name: string
  type: DocumentType
  createdAt: Date
  updatedAt: Date
  data: any
}

export interface DocumentTypeConfig {
  type: DocumentType
  name: string
  description: string
  icon: string
  route: string
  defaultData: any
}

export const DOCUMENT_TYPES: Record<DocumentType, DocumentTypeConfig> = {
  [DocumentType.MIND_MAP]: {
    type: DocumentType.MIND_MAP,
    name: 'Mind Map',
    description: 'Create visual mind maps and brainstorm ideas',
    icon: 'BrainIcon',
    route: '/mind',
    defaultData: {
      data: {
        text: 'New Mind Map'
      },
      children: []
    }
  },
  [DocumentType.DOCUMENT]: {
    type: DocumentType.DOCUMENT,
    name: 'Document',
    description: 'Write and edit text documents',
    icon: 'FileTextIcon',
    route: '/doc',
    defaultData: {
      content: ''
    }
  },
  [DocumentType.PRESENTATION]: {
    type: DocumentType.PRESENTATION,
    name: 'Presentation',
    description: 'Create beautiful presentations',
    icon: 'PresentationIcon',
    route: '/presentation',
    defaultData: {
      slides: []
    }
  }
}
