<script setup lang="ts">
import { ConversationProps } from "@/types";
import { formatDate } from "@/utils/date";
import { useConversationStroe} from '@/stores'
import {useRouter} from 'vue-router'

const conversationStore = useConversationStroe()
const router = useRouter()

defineProps<{ items: ConversationProps[] }>();

const goToConversation = (id: number) => {
  router.push({path: `/conversation/${id}`})
  conversationStore.selectedId = id
}

</script>

<template>
  <div class="conversation-list">
    <div
      class="item border-gray-300 border-t cursor-pointer p-2"
      :class="{
        'bg-gray-100 hover:bg-gray-300':conversationStore.selectedId === item.id,
        'bg-white hover:bg-gray-200':conversationStore.selectedId !== item.id
      }"
      v-for="item in items"
      :key="item.id"
    >
      <div  @click="goToConversation(item.id)">
        <div
          class="flex justify-between items-center text-sm leading-5 text-gray-500"
        >
          <span>{{ item.selectedModel }}</span>
          <span>{{ formatDate(item.updatedAt) }}</span>
        </div>
        <h2
          class="font-bold leading-6 text-gray-900 truncate"
          :title="item.title"
        >
          {{ item.title }}
        </h2>
      </div>
    </div>
  </div>
</template>
