<script setup lang="ts">
import { ref } from "vue"
import { Icon } from "@iconify/vue"
import { MessageProps } from "@/types"
import { formatDate } from "@/utils/date"
import VueMarkdown from "vue-markdown-render"
import markdownHighlight from "markdown-it-highlightjs"

defineProps<{
  messages: MessageProps[]
}>()

const plugins = [markdownHighlight]
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
            <div
              v-else
              class="inline-block prose prose-stone prose-headings:my-2 prose-li:my-0 prose-ul:my-1 prose-p:my-1 prose-blockquote:my-1 prose-pre:p-0"
            >
              <vue-markdown :source="message.content" :plugins="plugins" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
