<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MessageInput from '@/components/MessageInput.vue'
import MessageList from '@/views/MessageList.vue'
import { messages, conversations } from '@/testData'
import { MessageProps, ConversationProps } from '@/types'

const route = useRoute()

let conversationId = parseInt(route.params.id as string)

const filterMessages = ref<MessageProps[]>([])

const conversation = ref<ConversationProps>()
conversation.value = conversations.find((item) => item.id === conversationId)

filterMessages.value = messages.filter(
  (message) => message.conversationId === conversationId
)
watch(
  () => route.params.id,
  (newId: string) => {
    conversationId = parseInt(newId)
    filterMessages.value = messages.filter(
      (message) => message.conversationId === conversationId
    )
    conversation.value = conversations.find(
      (item) => item.id === conversationId
    )
  }
)
</script>

<template>
  <div
    v-if="conversation"
    class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between"
  >
    <h3 class="font-semibold text-gray-900 line-clamp-1">
      {{ conversation.title }}
    </h3>
    <span class="text-sm text-gray-500 flex-shrink-0">
      {{ conversation.createdAt }}
    </span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filterMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput />
  </div>
</template>
