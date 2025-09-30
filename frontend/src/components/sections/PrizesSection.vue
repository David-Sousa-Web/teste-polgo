<template>
  <section id="premios" class="py-16 min-h-screen flex items-center relative overflow-hidden" style="background-image: url('/322cbb62-89d3-40d7-93bb-be85f5be2b0f.png'); background-size: cover; background-position: center;">
    <div class="absolute inset-0 bg-white/10"></div>
    <div class="w-full max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
      <SectionHeader 
        title="Prêmios Incríveis" 
        subtitle="Conheça todos os prêmios que você pode ganhar" 
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <PrizeCard
          v-for="prize in prizes"
          :key="prize.id"
          :prize="prize"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import PrizeCard from '@/components/ui/PrizeCard.vue'

const prizes = ref([
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    description: 'Último lançamento da Apple com tecnologia de ponta',
    value: 'R$ 10.499',
    image: '/1722356530iPhone15ProMax8GB256GBNatural1jpg.jpg'
  },
  {
    id: 2,
    name: 'Viagem para Paris',
    description: 'Pacote completo para 2 pessoas, incluindo passagens e hospedagem',
    value: 'R$ 25.000',
    image: '/eiffel-tower-sunrise1.webp'
  },
  {
    id: 3,
    name: 'MacBook Pro M3',
    description: 'Notebook profissional com chip M3 de última geração',
    value: 'R$ 18.999',
    image: '/mbp16-spaceblack-gallery2-202310.png'
  },
  {
    id: 4,
    name: 'Tesla Model 3',
    description: 'Carro elétrico de luxo com tecnologia avançada',
    value: 'R$ 350.000',
    image: '/GUID-B5641257-9E85-404B-9667-4DA5FDF6D2E7-online-en-US.png'
  }
])
</script>

