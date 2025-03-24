import { BaseProider } from "./BaseProvider"
import { QianfanProvider } from "./QianfanProvider"
import { OpenAIProvider } from "./OpenAIProvider"

export function CreateProvider(providerName: string): BaseProider {
  switch (providerName) {
    case "qianfan":
      return new QianfanProvider()
    case "dashscope":
      return new OpenAIProvider(
        process.env.ALI_API_KEY as string,
        "https://dashscope.aliyuncs.com/compatible-mode/v1"
      )
    default:
      throw new Error(`Unknown provider: ${providerName}`)
  }
}
