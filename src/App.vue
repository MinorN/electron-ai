<script setup lang="ts">
import { ref } from 'vue'
import { ConversationProps, ProviderProps } from '@/types'
import { Icon } from '@iconify/vue'
import ConversationList from '@/components/ConversationList.vue'
import ProviderSelect from '@/components/ProviderSelect.vue'
import MessageInput from '@/components/MessageInput.vue'

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

const providers: ProviderProps[] = [
  {
    id: 1,
    name: '文心一言',
    desc: '文心一言 百度出品的大模型',
    models: ['ERNIE-4.0-8K', 'ERNIE-3.5-8K', 'ERNIE-Speed-8K'],
    avatar:
      'https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpeg',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
  },
  {
    id: 2,
    name: '通义千问',
    desc: '通义千问',
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max'],
    avatar:
      'https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpeg',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
  },
]

const selectedModel = ref('')
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
    <div class="h-full flex-1 flex items-center">
      <div class="w-[80%] mx-auto h-full">
        <div class="flex items-center h-[85%]">
          <ProviderSelect :items="providers" v-model="selectedModel" />
        </div>
        <div class="flex items-center h-[15%]">
          <MessageInput />
        </div>
      </div>
    </div>
  </div>
</template>
