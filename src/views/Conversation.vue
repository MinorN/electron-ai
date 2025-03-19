<script setup lang="ts">
import { ref, watch, onMounted } from "vue"
import { useRoute } from "vue-router"
import MessageInput from "@/components/MessageInput.vue"
import MessageList from "@/views/MessageList.vue"
import { MessageProps, ConversationProps } from "@/types"
import { db } from "@/db"
import { formatDate } from "@/utils/date"

const route = useRoute()

let conversationId = parseInt(route.params.id as string)
const filterMessages = ref<MessageProps[]>([])
const conversation = ref<ConversationProps>()

watch(
  () => route.params.id,
  async (newId: string) => {
    conversationId = parseInt(newId)
    conversation.value = await db.conversations
      .where({ id: conversationId })
      .first()
    filterMessages.value = await db.messages.where({ conversationId }).toArray()
  }
)

const initMessageId = parseInt(route.query.init as string)
const createInitialMessage = async () => {
  const createdData: Omit<MessageProps, "id"> = {
    content: "",
    conversationId,
    type:'answer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status:'loading'
  }
  const newMessageId = await db.messages.add(createdData)
  filterMessages.value.push({ id: newMessageId, ...createdData })
}

onMounted(async () => {
  conversation.value = await db.conversations
    .where({ id: conversationId })
    .first()
  filterMessages.value = await db.messages.where({ conversationId }).toArray()
  if(initMessageId){
    createInitialMessage()
  }
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
    <MessageInput />
  </div>
</template>
