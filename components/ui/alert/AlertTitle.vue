<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div class=" text-lg font-semibold bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">

    <h5 :class="cn('mb-1 font-medium leading-none tracking-tight', props.class)">
      <slot />
    </h5>
  </div>
</template>
