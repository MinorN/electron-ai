<script setup lang="ts">
import { ref } from "vue";
import { ConversationProps, ProviderProps } from "@/types";
import ProviderSelect from "@/components/ProviderSelect.vue";
import MessageInput from "@/components/MessageInput.vue";
import { providers } from "@/testData";

const selectedModel = ref("");
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
