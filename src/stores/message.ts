import { defineStore } from 'pinia'
import { MessageProps, UpdateStreamData } from '@/types'
import { db } from '@/db'

export interface MessageStroe {
  items: MessageProps[]
}

export const useMessageStroe = defineStore('message', {
  state: (): MessageStroe => {
    return {
      items: [],
    }
  },
  getters: {
    getLastQuestion: (state) => (conversationId: number) => {
      return state.items.findLast(
        (item) =>
          item.conversationId === conversationId && item.type === 'question'
      )
    },
  },
  actions: {
    async fetchMessageByConversation(conversationId: number) {
      const items = await db.messages.where({ conversationId }).toArray()
      this.items = items
    },
    async createMessage(createdData: Omit<MessageProps, 'id'>) {
      const newMessageId = await db.messages.add(createdData)
      this.items.push({ id: newMessageId, ...createdData })
      return newMessageId
    },
    async updateMessage(streamData: UpdateStreamData) {
      const { messageId, data } = streamData
      const currentMessage = this.items.find((item) => item.id === messageId)
      if (currentMessage) {
        const updatedData: Partial<MessageProps> = {
          content: currentMessage.content + data.result,
          status: data.is_end ? 'finished' : 'streaming',
          updatedAt: new Date().toISOString(),
        }
        await db.messages.update(messageId, updatedData)
        // 更新响应式数据
        const index = this.items.findIndex((item) => item.id === messageId)
        if (index !== -1) {
          this.items[index] = {
            ...this.items[index],
            ...updatedData,
          }
        }
      }
    },
  },
})
