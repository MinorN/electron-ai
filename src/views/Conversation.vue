<script setup lang="ts">
import { ref, watch, onMounted, computed, nextTick } from "vue"
import { useRoute } from "vue-router"
import MessageInput from "@/components/MessageInput.vue"
import MessageList from "@/views/MessageList.vue"
import { MessageProps, MessageListInstance } from "@/types"
import { db } from "@/db"
import { formatDate } from "@/utils/date"
import { useConversationStroe, useMessageStroe } from "@/stores"

const route = useRoute()
const conversationStore = useConversationStroe()
const messageStore = useMessageStroe()

const conversationId = ref(parseInt(route.params.id as string))
const filterMessages = computed(() => messageStore.items)
const conversation = computed(() =>
  conversationStore.getConversationById(conversationId.value)
)

// 自动滚动至底部
const scrollToBottom = async () => {
  await nextTick()
  if (messageListRef.value) {
    messageListRef.value.ref.scrollIntoView({
      block: "end",
      behavior: "smooth",
    })
  }
}

watch(
  () => route.params.id,
  async (newId: string) => {
    conversationId.value = parseInt(newId)
    await messageStore.fetchMessageByConversation(conversationId.value)
    await scrollToBottom()
  }
)

const initMessageId = parseInt(route.query.init as string)
const lastQuestrion = computed(() =>
  messageStore.getLastQuestion(conversationId.value)
)

// 大模型接口的上下文
const sendedMessages = computed(() =>
  filterMessages.value
    .filter((message) => message.status !== "loading")
    .map((message) => {
      return {
        role: message.type === "question" ? "user" : "assistant",
        content: message.content,
        ...(message.imagePath && { imagePath: message.imagePath }),
      }
    })
)
const inputValue = ref("")

const sendNewMessage = async (question: string, imagePath?: string) => {
  if (question && question.trim() !== "") {
    const date = new Date().toISOString()
    let copyImagePath: string | undefined
    if (imagePath) {
      try {
        copyImagePath = await window.electronApi.copyImageToUserDir(imagePath)
      } catch (e) {
        console.error("Failed to copy image to user dir")
      }
    }
    const newMessageId = await messageStore.createMessage({
      content: question,
      conversationId: conversationId.value,
      type: "question",
      createdAt: date,
      updatedAt: date,
      ...(copyImagePath && { imagePath: copyImagePath }),
    })
    inputValue.value = ""
    createInitialMessage()
  }
}

const createInitialMessage = async () => {
  const createdData: Omit<MessageProps, "id"> = {
    content: "",
    conversationId: conversationId.value,
    type: "answer",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "loading",
  }
  const newMessageId = await messageStore.createMessage(createdData)
  await scrollToBottom()
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

const messageListRef = ref<MessageListInstance>()

onMounted(async () => {
  await messageStore.fetchMessageByConversation(conversationId.value)
  if (initMessageId) {
    await createInitialMessage()
  }
  await scrollToBottom()

  let currentMessageListHeight = 0
  const needToBottom = async () => {
    if (messageListRef.value) {
      const newHeight = messageListRef.value.ref.clientHeight
      if (newHeight > currentMessageListHeight) {
        currentMessageListHeight = newHeight
        await scrollToBottom()
      }
    }
  }

  window.electronApi.onUpdateMessage(async (streamData) => {
    messageStore.updateMessage(streamData)
    await nextTick()
    await needToBottom()
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
    <MessageList :messages="filterMessages" ref="messageListRef" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput
      v-model="inputValue"
      @create="sendNewMessage"
      :disabled="messageStore.isMessageLoading"
    />
  </div>
</template>
