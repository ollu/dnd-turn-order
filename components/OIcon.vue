<template>
  <svg :class="iconClass" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path :d="icon" />
  </svg>
</template>
<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  icon: String,
  size: {
    type: String,
    default: 'normal'
  },
  color: {
    type: String,
    default: 'light'
  },
})

const iconSizes = {
  'small': 'w-4 h-4',
  'normal': 'w-6 h-6',
  'medium': 'w-8 h-8',
  'large': 'w-10 h-10',
  'x-large': 'w-12 h-12',
}

const iconColors = {
  'light': 'text-gray-100',
  'medium-light': 'text-gray-300',
  'medium': 'text-gray-500',
  'dark': 'text-gray-800',
  'hero': 'text-yellow-500',
}

const iconClass = computed(() => {
  return `${iconSizes[props.size]} ${iconColors[props.color]}`
})
</script>
