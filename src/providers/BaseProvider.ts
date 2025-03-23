import { ChatMessageProps } from '@/types'

export abstract class BaseProider {
  abstract chat(messages: ChatMessageProps[], modelName: string): Promise<any>
}
