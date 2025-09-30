<template>
  <div 
    class="bg-white rounded-lg mb-4 shadow-soft hover:shadow-medium transition-all duration-300 ease-out overflow-hidden cursor-pointer"
    :class="{ 'shadow-medium': isActive }"
    @click="$emit('toggle')"
  >
    <button 
      class="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300 ease-out"
      type="button"
    >
      <span class="text-lg font-semibold text-gray-800 pr-4">{{ faq.question }}</span>
      <svg 
        class="flex-shrink-0 w-6 h-6 text-primary-500 transform transition-transform duration-500 ease-out"
        :class="{ 'rotate-180': isActive }"
        width="24" 
        height="24" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <transition
      name="slide"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
    >
      <div v-if="isActive" class="overflow-hidden">
        <div class="px-6 pb-6 text-gray-600 leading-relaxed">
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
interface Faq {
  id: number
  question: string
  answer: string
}

interface Props {
  faq: Faq
  isActive: boolean
}

defineProps<Props>()
defineEmits<{
  toggle: []
}>()

const onEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.opacity = '0'
  element.offsetHeight
  
  element.style.transition = 'height 0.5s ease-out, opacity 0.3s ease-out'
  element.style.height = element.scrollHeight + 'px'
  element.style.opacity = '1'
}

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
}

const onLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = element.scrollHeight + 'px'
  element.offsetHeight
  
  element.style.transition = 'height 0.5s ease-out, opacity 0.3s ease-out'
  element.style.height = '0'
  element.style.opacity = '0'
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  height: 0;
  opacity: 0;
}
</style>

