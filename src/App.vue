<script setup lang="ts">
import { ConversationProps } from '@/types'
import { Icon } from '@iconify/vue'
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
  {
    id: 4,
    title: 'Conversation 3',
    providerId: 1,
    selectedModel: 'Model 3',
    createdAt: '2021-10-01',
    updatedAt: '2021-10-01',
  },
  {
    id: 5,
    title: 'Conversation 3',
    providerId: 1,
    selectedModel: 'Model 3',
    createdAt: '2021-10-01',
    updatedAt: '2021-10-01',
  },
  {
    id: 6,
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
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :items="items" />
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <button
          class="shadow-sm inline-flex items-center justify-center bg-green-700 text-white hover:bg-green-700/90 border border-green-700 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
        >
          <Icon icon="radix-icons:chat-bubble" class="mr-2" />
          新建聊天
        </button>
        <button
          class="shadow-sm inline-flex items-center justify-center bg-green-50 text-green-700 hover:bg-green-700 border hover:text-white border-green-700 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
        >
          <Icon icon="radix-icons:gear" class="mr-2" />
          应用设置
        </button>
      </div>
    </div>
    <div class="h-full flex-1"></div>
  </div>
</template>
