<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { MessageProps } from "@/types";
import { formatDate } from "@/utils/date";
import VueMarkdown from 'vue-markdown-render'

defineProps<{
  messages: MessageProps[];
}>();
</script>

<template>
  <div>
    <div v-for="message in messages" :key="message.id" class="mb-3">
      <div class="flex" :class="{ 'justify-end': message.type === 'question' }">
        <div>
          <div
            class="text-sm text-gray-500 mb-2"
            :class="{ 'text-right': message.type === 'question' }"
          >
            {{ formatDate(message.createdAt) }}
          </div>
          <div
            v-if="message.type === 'question'"
            class="bg-green-700 text-white p-2 rounded-md inline-block float-right"
          >
            {{ message.content }}
          </div>
          <div v-else class="bg-gray-200 text-gray-700 p-2 rounded-md">
            <template v-if="message.status === 'loading'">
              <Icon icon="eos-icons:three-dots-loading"></Icon>
            </template>
            <template v-else class="inline-block">
              <vue-markdown :source="message.content" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
