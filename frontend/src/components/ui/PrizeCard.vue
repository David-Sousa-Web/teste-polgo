<template>
  <div class="bg-white rounded-xl shadow-soft overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-medium group flex border border-gray-400">
    <div class="w-2/5 h-64 overflow-hidden flex-shrink-0">
      <img 
        :src="prize.image" 
        :alt="prize.name" 
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    
    <div class="w-3/5 p-6 flex flex-col justify-center">
      <h3 class="text-xl font-semibold mb-3 text-gray-800">{{ prize.name }}</h3>
      <p class="text-gray-600 mb-4 leading-relaxed text-sm">{{ prize.description }}</p>
      <div class="text-2xl font-bold text-purple-600">{{ prize.value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Prize {
  id: number
  name: string
  description: string
  value: string
  image: string
}

interface Props {
  prize: Prize
}

defineProps<Props>()
</script>

