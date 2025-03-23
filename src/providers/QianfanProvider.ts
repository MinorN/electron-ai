import { CreateCharProps, UpdateStreamData, ChatMessageProps } from '@/types'
import { ChatCompletion } from '@baiducloud/qianfan'
import { BaseProider } from './BaseProvider'

export class QianfanProvider extends BaseProider {
  private client: any
  constructor(accessKey: string, secretKey: string) {
    super()
    this.client = new ChatCompletion({
      QIANFAN_ACCESS_KEY: accessKey,
      QIANFAN_SECRET_KEY: secretKey,
      ENABLE_OAUTH: false,
    })
  }
  async chat(messages: ChatMessageProps[], model: string) {
    const stream = this.client.chat(
      {
        messages,
        stream: true,
      },
      model
    )
    return stream
  }
}
