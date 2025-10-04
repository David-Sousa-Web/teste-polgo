<template>
  <section id="como-participar" class="py-20 min-h-screen flex items-center bg-white">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <p class="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-4">PARTICIPE</p>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Seu Caminho Para Prêmios Incríveis Começa Aqui
          </h2>
        </div>
        
        <div class="flex items-center">
          <p class="text-lg text-gray-700 leading-relaxed">
            Participar é muito simples e rápido! Siga nossos passos fáceis para começar a concorrer 
            aos prêmios mais incríveis. Cada etapa foi pensada para tornar sua experiência única e 
            emocionante. Cadastre-se, participe e acompanhe sua jornada rumo a prêmios que podem 
            transformar sua vida.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div
          v-for="(step, index) in participationSteps"
          :key="step.id"
          class="group"
        >
          <div class="mb-6">
            <span class="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-600">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>
          
          <h3 class="text-xl font-bold text-gray-900 mb-3 uppercase">
            {{ step.title }}
          </h3>
          
          <p class="text-gray-700 leading-relaxed">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

const UserPlusIcon = () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' })
])

const ShoppingBagIcon = () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' })
])

const TicketIcon = () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' })
])

const TrophyIcon = () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' })
])

const participationSteps = ref([
  {
    id: 1,
    title: 'Cadastre-se Gratuitamente',
    description: 'Crie sua conta gratuita em nossa plataforma com seus dados pessoais e comece a participar imediatamente',
    iconComponent: UserPlusIcon
  },
  {
    id: 2,
    title: 'Realize Suas Compras',
    description: 'Cada compra qualificada aumenta suas chances de ganhar prêmios incríveis de marcas nacionais',
    iconComponent: ShoppingBagIcon
  },
  {
    id: 3,
    title: 'Monitore Seu Progresso',
    description: 'Acompanhe suas entradas e sorteios através do nosso painel digital de rastreamento em tempo real',
    iconComponent: TicketIcon
  },
  {
    id: 4,
    title: 'Ganhe Prêmios Incríveis',
    description: 'Aguarde os sorteios e descubra se você é um dos sortudos ganhadores dos nossos prêmios',
    iconComponent: TrophyIcon
  }
])
</script>

