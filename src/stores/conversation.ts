import { defineStore } from "pinia"
import { ConversationProps } from "@/types"
import { db } from "@/db"

export interface ConversationStroe {
  items: ConversationProps[]
  selectedId: number
}

export const useConversationStroe = defineStore("conversation", {
  state: (): ConversationStroe => {
    return {
      items: [],
      selectedId: -1,
    }
  },
  getters: {
    total: (state) => state.items.length,
    getConversationById: (state) => (id: number) => {
      return state.items.find((item) => item.id === id)
    },
  },
  actions: {
    async fetchConversations() {
      const items = await db.conversations.toArray()
      this.items = items
    },
    async createConversation(createdData: Omit<ConversationProps, "id">) {
      const newCId = await db.conversations.add(createdData)
      this.items.push({
        id: newCId,
        ...createdData,
      })
      return newCId
    },
  },
})
