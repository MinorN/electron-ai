import { ChatMessageProps, ChunkProps } from "../types"

export abstract class BaseProider {
  abstract chat(
    messages: ChatMessageProps[],
    modelName: string
  ): Promise<AsyncIterable<ChunkProps>>
  protected abstract transformResp(chunk: any): ChunkProps
}
