import { ChatMessageProps, ChunkProps } from "@/types"
import { ChatCompletion } from "@baiducloud/qianfan"
import { BaseProider } from "./BaseProvider"

export class QianfanProvider extends BaseProider {
  private client: ChatCompletion
  constructor() {
    super()
    this.client = new ChatCompletion()
  }
  async chat(messages: ChatMessageProps[], model: string) {
    const stream = await this.client.chat(
      {
        messages,
        stream: true,
      },
      model
    )
    const self = this
    return {
      async *[Symbol.asyncIterator]() {
        for await (const chunk of stream) {
          yield self.transformResp(chunk)
        }
      },
    }
  }
  protected transformResp(chunk: any): ChunkProps {
    return {
      is_end: chunk.is_end,
      result: chunk.result,
    }
  }
}
