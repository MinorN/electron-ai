<script setup lang="ts">
import { ref } from 'vue'
import { ConversationProps, ProviderProps } from '@/types'
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
    <div class="w-[80%] mx-auto h-full">
      <div class="flex items-center h-[85%]">
        <ProviderSelect :items="providers" v-model="selectedModel" />
      </div>
      <div class="flex items-center h-[15%]">
        <MessageInput />
      </div>
    </div>
  </div>
</template>
