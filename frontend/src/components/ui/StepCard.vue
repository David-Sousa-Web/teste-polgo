<template>
  <div class="relative text-center p-8 bg-white rounded-xl shadow-soft hover:-translate-y-2 hover:shadow-medium transition-all duration-300">
    <div class="flex items-center justify-center mx-auto mb-6 text-purple-600">
      <UserPlus v-if="icon === 'UserPlusIcon'" :size="48" />
      <ShoppingBag v-else-if="icon === 'ShoppingBagIcon'" :size="48" />
      <Ticket v-else-if="icon === 'TicketIcon'" :size="48" />
      <Trophy v-else-if="icon === 'TrophyIcon'" :size="48" />
      <span v-else class="text-4xl font-bold text-purple-600">{{ stepNumber }}</span>
    </div>
    
    <h3 class="text-xl font-semibold mb-4 text-gray-900">{{ title }}</h3>
    <p class="text-gray-700 leading-relaxed">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { 
  UserPlus, 
  ShoppingBag, 
  Ticket, 
  Trophy 
} from 'lucide-vue-next'

interface Props {
  stepNumber: number
  title: string
  description: string
  icon?: string
}

defineProps<Props>()
</script>

