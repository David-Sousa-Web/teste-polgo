<template>
  <section id="ganhadores" class="py-16 min-h-screen flex items-center">
    <div class="w-full max-w-6xl mx-auto px-4 sm:px-8">
      <SectionHeader 
        title="Ganhadores" 
        subtitle="Veja quem já foi premiado em nossa promoção" 
      />

      <div class="text-center p-16 bg-white rounded-xl shadow-soft border-2 border-dashed border-gray-300">
        <div class="max-w-lg mx-auto">
          <svg width="80" height="80" fill="currentColor" viewBox="0 0 24 24" class="text-primary-500 opacity-70 mx-auto mb-6">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Mapa Interativo em Desenvolvimento</h3>
          <p class="text-lg text-gray-600 mb-6">Em breve você poderá visualizar:</p>
          <ul class="text-left inline-block text-gray-600 space-y-2">
            <li>🗺️ Mapa interativo do Brasil</li>
            <li>📊 Totalizadores por estado</li>
            <li>👥 Lista detalhada de ganhadores</li>
            <li>🔍 Filtros por estado e prêmio</li>
            <li>📄 Paginação inteligente</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeader from '@/components/ui/SectionHeader.vue'
</script>

