import { ChatMessageProps } from '@/types'
import { BaseProider } from './BaseProvider'
import OpenAI from 'openai'

export class OpenAIProvider extends BaseProider {
  private client: any
  constructor(apiKey: string, baseURL: string) {
    super()
    this.client = new OpenAI({
      apiKey,
      baseURL,
    })
  }
  async chat(messages: ChatMessageProps[], model: string) {
    const stream = await this.client.chat.completions.create({
      messages,
      model: model,
      stream: true,
    })
    return stream
  }
}
