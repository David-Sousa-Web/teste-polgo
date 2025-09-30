<template>
  <section id="como-participar" class="py-16 min-h-screen flex items-center bg-gray-50">
    <div class="w-full max-w-6xl mx-auto px-4 sm:px-8">
      <SectionHeader 
        title="Como Participar" 
        subtitle="É muito fácil! Siga estes passos simples e concorra aos nossos prêmios" 
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StepCard
          v-for="(step, index) in participationSteps"
          :key="step.id"
          :step-number="index + 1"
          :title="step.title"
          :description="step.description"
          :icon="step.icon"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import StepCard from '@/components/ui/StepCard.vue'

const participationSteps = ref([
  {
    id: 1,
    title: 'Cadastre-se',
    description: 'Crie sua conta em nossa plataforma com seus dados pessoais',
    icon: 'UserPlusIcon'
  },
  {
    id: 2,
    title: 'Participe',
    description: 'Realize compras em nossas lojas participantes',
    icon: 'ShoppingBagIcon'
  },
  {
    id: 3,
    title: 'Concorra',
    description: 'Cada compra gera números da sorte para você',
    icon: 'TicketIcon'
  },
  {
    id: 4,
    title: 'Ganhe',
    description: 'Acompanhe os sorteios e torça para ser o próximo ganhador!',
    icon: 'TrophyIcon'
  }
])
</script>

