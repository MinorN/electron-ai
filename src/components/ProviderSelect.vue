<script setup lang="ts">
import { ProviderProps } from '@/types'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'

defineProps<{ items: ProviderProps[] }>()
</script>

<template>
  <SelectRoot>
    <SelectTrigger>
      <SelectValue placeholder="请选择模型" />
    </SelectTrigger>
    <SelectPortal>
      <SelectContent>
        <SelectViewport>
          <div v-for="provide in items" :key="provide.id">
            <SelectLabel>
              <img :src="provide.avatar" :alt="provide.name" />
              {{ provide.name }}
            </SelectLabel>
            <SelectGroup>
              <SelectItem
                v-for="(model, index) in provide.models"
                :key="index"
                :value="model"
              >
                <SelectItemText>{{ model }}</SelectItemText>
              </SelectItem>
            </SelectGroup>
          </div>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
