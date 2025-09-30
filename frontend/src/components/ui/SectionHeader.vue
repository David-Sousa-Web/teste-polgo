<template>
  <div class="text-center mb-12">
    <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">{{ title }}</h2>
    <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" v-if="subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

