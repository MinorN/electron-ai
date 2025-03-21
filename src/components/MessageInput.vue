<template>
  <div
    class="message-input w-full shadow-sm border rounded-lg border-gray-300 py-1 px-2 focus-within:border-green-700"
  >
    <div v-if="imgPreview" class="mb-2 relative flex items-center">
      <img
        :src="imgPreview"
        :alt="imgAlt"
        class="h-24 w-24 object-contain rounder"
      />
    </div>
    <div class="flex items-center">
      <Icon
        icon="radix-icons:image"
        width="24"
        height="24"
        class="mr-2"
        :class="[
          disabled
            ? 'text-gray-300 cursor-not-allowed'
            : ' text-gray-400 cursor-pointer hover:text-gray-600',
        ]"
        @click="onFileInput"
      />
      <input
        type="file"
        accept="image/*"
        class="hidden"
        ref="fileInputRef"
        @change="handleImageUpload"
      />
      <input
        class="outline-none border-0 flex-1 bg-white focus:ring-0"
        type="text"
        v-model="model"
        :disabled="disabled"
      />
      <button
        class="shadow-sm inline-flex items-center justify-center bg-green-700 text-white hover:bg-green-700/90 border border-green-700 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
        @click="onCreate"
        :disabled="disabled"
      >
        <Icon icon="radix-icons:paper-plane" class="mr-2" />
        发送
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { Icon } from "@iconify/vue"

const emit = defineEmits<{
  create: [value: string, imagePath?: string]
}>()

const props = defineProps<{
  disabled?: boolean
}>()

const model = defineModel<string>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const onFileInput = () => {
  if (props.disabled) return
  fileInputRef.value?.click()
}

const imgPreview = ref<string | null>(null)
const imgAlt = ref<string>("")
let image: File | null = null
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    image = target.files[0]
    imgAlt.value = image.name
    const reader = new FileReader()
    reader.onload = (e) => {
      imgPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(image)
  }
}

const onCreate = () => {
  if (model.value && model.value.trim() !== "") {
    if (image) {
      const filePath = window.electronApi.getFilePath(image)
      emit("create", model.value, filePath)
    } else {
      emit("create", model.value)
    }
    model.value = ""
    imgPreview.value = null
    imgAlt.value = ""
    image = null
  }
}
</script>
