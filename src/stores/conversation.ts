import { defineStore } from 'pinia'
import { ConversationProps } from '@/types'

export interface ConversationStroe {
  items: ConversationProps[]
}

export const useConversationStroe = defineStore('conversation', {
  state: (): ConversationStroe => {
    return {
      items: [],
    }
  },
})
