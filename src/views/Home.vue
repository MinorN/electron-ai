<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { ConversationProps, ProviderProps } from "../types";
import ProviderSelect from "@/components/ProviderSelect.vue";
import MessageInput from "@/components/MessageInput.vue";
import { db } from "@/db";

const router = useRouter();

const currentProvider = ref("");
const providers = ref<ProviderProps[]>([]);

const modelInfo = computed(() => {
  const [providerId, selectedModel] = currentProvider.value.split("/");
  return {
    providerId: parseInt(providerId),
    selectedModel,
  };
});

const createConversation = async (question) => {
  const { providerId, selectedModel } = modelInfo.value;
  const currentDate = new Date().toISOString();
  const conversationId = await db.conversations.add({
    title: question,
    providerId,
    selectedModel,
    createdAt: currentDate,
    updatedAt: currentDate,
  });
  const newMessageId = await db.messages.add({
    conversationId,
    type: "question",
    content: question,
    createdAt: currentDate,
    updatedAt: currentDate,
  });
  router.push(`/conversation/${conversationId}?init=${newMessageId}`);
};

onMounted(async () => {
  providers.value = await db.providers.toArray();
});
</script>

<template>
  <div class="flex items-center justify-between h-screen">
    <div class="w-[80%] mx-auto h-full">
      <div class="flex items-center h-[85%]">
        <ProviderSelect :items="providers" v-model="currentProvider" />
      </div>
      <div class="flex items-center h-[15%]">
        <MessageInput @create="createConversation" />
      </div>
    </div>
  </div>
</template>
