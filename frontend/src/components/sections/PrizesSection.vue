<template>
  <section id="premios" class="py-20 min-h-screen flex items-center relative overflow-hidden bg-gray-50">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-8">
      <div class="text-center mb-16">
        <p class="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">PRÊMIOS</p>
        <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Recompensas Incríveis Te Esperam
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubra uma variedade de prêmios incríveis das melhores marcas. Algo para todos.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button
          v-for="prize in prizes"
          :key="prize.id"
          @click="selectedPrize = prize"
          class="px-6 py-3 font-medium text-base transition-all duration-200 border-b-2"
          :class="selectedPrize?.id === prize.id 
            ? 'text-purple-600 border-purple-600' 
            : 'text-gray-600 border-transparent hover:text-purple-600'"
        >
          {{ prize.name }}
        </button>
      </div>

      <div v-if="selectedPrize" class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <div class="order-1 lg:order-1">
          <div class="bg-white rounded-2xl overflow-hidden shadow-xl aspect-[4/3] flex items-center justify-center p-8">
            <img 
              :src="selectedPrize.image" 
              :alt="selectedPrize.name"
              class="w-full h-full object-contain"
            />
          </div>
        </div>

        <div class="order-2 lg:order-2 space-y-6">
          <div>
            <p class="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">
              {{ selectedPrize.category }}
            </p>
            <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {{ selectedPrize.name }}
            </h3>
            <p class="text-lg text-gray-600 leading-relaxed">
              {{ selectedPrize.description }}
            </p>
          </div>

          <div class="pt-6 border-t border-gray-200">
            <div class="flex items-baseline gap-2 mb-4">
              <span class="text-sm font-medium text-gray-500">Valor estimado:</span>
              <span class="text-3xl font-bold text-purple-600">{{ selectedPrize.value }}</span>
            </div>
            
            <div class="space-y-3">
              <div v-for="feature in selectedPrize.features" :key="feature" class="flex items-start gap-3">
                <svg class="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ feature }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const prizes = ref([
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'ELETRÔNICOS',
    description: 'Ganhe eletrônicos de ponta dos principais fabricantes. Smartphones, laptops e muito mais.',
    value: 'R$ 10.499',
    image: '/1722356530iPhone15ProMax8GB256GBNatural1jpg.jpg',
    features: [
      'Chip A17 Pro de última geração',
      '256GB de armazenamento',
      'Câmera profissional tripla',
      'Tela Super Retina XDR de 6.7"'
    ]
  },
  {
    id: 2,
    name: 'Viagem para Paris',
    category: 'VIAGENS',
    description: 'Explore o mundo com viagens com tudo pago para destinos dos sonhos. Crie memórias inesquecíveis.',
    value: 'R$ 25.000',
    image: '/eiffel-tower-sunrise1.webp',
    features: [
      'Passagens aéreas para 2 pessoas',
      '7 noites em hotel 5 estrelas',
      'Passeios guiados inclusos',
      'Café da manhã e transfers'
    ]
  },
  {
    id: 3,
    name: 'MacBook Pro M3',
    category: 'ELETRÔNICOS',
    description: 'Notebook profissional com chip M3 para máximo desempenho e produtividade.',
    value: 'R$ 18.999',
    image: '/mbp16-spaceblack-gallery2-202310.png',
    features: [
      'Chip M3 Pro de alto desempenho',
      '16GB de RAM unificada',
      '512GB SSD ultrarrápido',
      'Tela Liquid Retina XDR 16"'
    ]
  },
  {
    id: 4,
    name: 'Tesla Model 3',
    category: 'EXPERIÊNCIAS',
    description: 'Veículo elétrico de luxo com tecnologia avançada e desempenho sustentável.',
    value: 'R$ 350.000',
    image: '/GUID-B5641257-9E85-404B-9667-4DA5FDF6D2E7-online-en-US.png',
    features: [
      'Motor elétrico de alto desempenho',
      'Autonomia de até 600km',
      'Piloto automático avançado',
      'Aceleração de 0-100 em 3.3s'
    ]
  }
])

const selectedPrize = ref(prizes.value[0])
</script>

