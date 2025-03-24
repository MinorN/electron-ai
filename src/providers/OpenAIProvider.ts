import { ChatMessageProps, ChunkProps } from "@/types"
import { BaseProider } from "./BaseProvider"
import OpenAI from "openai"
import { convertMessage } from "@/utils/helper"

export class OpenAIProvider extends BaseProider {
  private client: OpenAI
  constructor(apiKey: string, baseURL: string) {
    super()
    this.client = new OpenAI({
      apiKey,
      baseURL,
    })
  }
  async chat(messages: ChatMessageProps[], model: string) {
    const convertMessages = await convertMessage(messages)
    const stream = await this.client.chat.completions.create({
      messages: convertMessages,
      model: model,
      stream: true,
    })
    const self = this
    return {
      async *[Symbol.asyncIterator]() {
        for await (const chunk of stream) {
          yield self.transformResp(chunk)
        }
      },
    }
  }

  protected transformResp(
    chunk: OpenAI.Chat.Completions.ChatCompletionChunk
  ): ChunkProps {
    const choice = chunk.choices[0]
    return {
      is_end: choice.finish_reason === "stop",
      result: choice.delta.content || "",
    }
  }
}
