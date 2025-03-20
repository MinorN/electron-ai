<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import MessageInput from '@/components/MessageInput.vue'
import MessageList from '@/views/MessageList.vue'
import { MessageProps, ConversationProps } from '@/types'
import { db } from '@/db'
import { formatDate } from '@/utils/date'
import { useConversationStroe, useMessageStroe } from '@/stores'

const route = useRoute()
const conversationStore = useConversationStroe()
const messageStore = useMessageStroe()

const conversationId = ref(parseInt(route.params.id as string))
const filterMessages = computed(() => messageStore.items)
const conversation = computed(() =>
  conversationStore.getConversationById(conversationId.value)
)

watch(
  () => route.params.id,
  async (newId: string) => {
    conversationId.value = parseInt(newId)
    await messageStore.fetchMessageByConversation(conversationId.value)
  }
)

const initMessageId = parseInt(route.query.init as string)
const lastQuestrion = computed(() =>
  messageStore.getLastQuestion(conversationId.value)
)

// 大模型接口的上下文
const sendedMessages = computed(() =>
  filterMessages.value
    .filter((message) => message.status !== 'loading')
    .map((message) => {
      return {
        role: message.type === 'question' ? 'user' : 'assistant',
        content: message.content,
      }
    })
)
const inputValue = ref('')

const sendNewMessage = async (question: string) => {
  if (question && question.trim() !== '') {
    const date = new Date().toISOString()
    const newMessageId = await messageStore.createMessage({
      content: question,
      conversationId: conversationId.value,
      type: 'question',
      createdAt: date,
      updatedAt: date,
    })
    inputValue.value = ''
    createInitialMessage()
  }
}

const createInitialMessage = async () => {
  const createdData: Omit<MessageProps, 'id'> = {
    content: '',
    conversationId: conversationId.value,
    type: 'answer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'loading',
  }
  const newMessageId = await messageStore.createMessage(createdData)
  if (conversation.value) {
    const provider = await db.providers
      .where({ id: conversation.value.providerId })
      .first()
    if (provider) {
      // 发送消息
      await window.electronApi.startChat({
        messageId: newMessageId,
        providerName: provider.name,
        selectedModel: conversation.value.selectedModel,
        messages: sendedMessages.value as any,
      })
    }
  }
}

onMounted(async () => {
  await messageStore.fetchMessageByConversation(conversationId.value)
  if (initMessageId) {
    await createInitialMessage()
  }
  window.electronApi.onUpdateMessage(async (streamData) => {
    messageStore.updateMessage(streamData)
  })
})
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
      {{ formatDate(conversation.createdAt) }}
    </span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filterMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput v-model="inputValue" @create="sendNewMessage" :disabled="messageStore.isMessageLoading" />
  </div>
</template>
