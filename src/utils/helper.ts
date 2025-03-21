import fs from "fs/promises"
import { lookup } from "mime-types"

export async function convertMessage(
  messages: {
    role: "user" | "assistant"
    content: string
    imagePath?: string
  }[]
) {
  const result = []
  for (const message of messages) {
    let convertContent: string | any
    if (message.imagePath) {
      const imageBuffer = await fs.readFile(message.imagePath)
      const base64 = imageBuffer.toString("base64")
      const mimeType = lookup(message.imagePath)
      convertContent = [
        {
          type: "text",
          text: message.content,
        },
        {
          type: "image_url",
          image_url: { url: `data:${mimeType};base64,${base64}` },
        },
      ]
    } else {
      convertContent = message.content
    }
    const { imagePath, ...rest } = message
    result.push({
      ...rest,
      content: convertContent,
    })
  }
  return result
}
