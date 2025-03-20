export interface ConversationProps {
  id: number
  title: string
  selectedModel: string
  createdAt: string
  updatedAt: string
  providerId: number // 使用的哪个模型
}

export interface ProviderProps {
  id: number
  name: string
  title?: string
  desc?: string
  avatar?: string
  createdAt: string
  updatedAt: string
  models: string[]
}

export type MessageStatus = 'loading' | 'streaming' | 'finished'

export interface MessageProps {
  id: number
  content: string
  type: 'question' | 'answer'
  conversationId: number
  status?: MessageStatus
  createdAt: string
  updatedAt: string
}

export interface CreateCharProps {
  messages: { role: 'user' | 'assistant'; content: string }[]
  providerName: string
  selectedModel: string
  messageId: number
}

export interface UpdateStreamData {
  messageId: number
  data: {
    is_end: boolean
    result: string
  }
}

export type OnUpdateCallback = (data: UpdateStreamData) => void

export interface MessageListInstance {
  ref: HTMLDataElement
}
