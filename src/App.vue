<script setup lang="ts">
import { ConversationProps } from '@/types'
import ConversationList from '@/components/ConversationList.vue'

const items: ConversationProps[] = [
  {
    id: 1,
    title: 'Conversation 1',
    providerId: 1,
    selectedModel: 'Model 1',
    createdAt: '2021-10-01',
    updatedAt: '2021-10-01',
  },
  {
    id: 2,
    title: 'Conversation 2',
    providerId: 1,
    selectedModel: 'Model 2',
    createdAt: '2021-10-01',
    updatedAt: '2021-10-01',
  },
  {
    id: 3,
    title: 'Conversation 3',
    providerId: 1,
    selectedModel: 'Model 3',
    createdAt: '2021-10-01',
    updatedAt: '2021-10-01',
  },
]
</script>

<template>
  <div class="flex items-center justify-between h-screen">
    <div class="w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <ConversationList :items="items" />
    </div>
    <div class="h-full flex-1"></div>
  </div>
</template>
