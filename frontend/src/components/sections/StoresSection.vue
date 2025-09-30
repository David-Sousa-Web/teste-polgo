<template>
  <section id="lojas" class="py-16 min-h-screen flex items-center bg-gray-50">
    <div class="w-full max-w-6xl mx-auto px-4 sm:px-8">
      <SectionHeader 
        title="Lojas Participantes" 
        subtitle="Encontre a loja mais próxima de você" 
      />

      <div class="text-center p-16 bg-white rounded-xl shadow-soft border-2 border-dashed border-gray-300">
        <div class="max-w-lg mx-auto">
          <svg width="80" height="80" fill="currentColor" viewBox="0 0 24 24" class="text-secondary-500 opacity-70 mx-auto mb-6">
            <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
          </svg>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Mapa de Lojas em Desenvolvimento</h3>
          <p class="text-lg text-gray-600 mb-6">Em breve você poderá acessar:</p>
          <ul class="text-left inline-block text-gray-600 space-y-2">
            <li>🗺️ Mapa interativo com todas as lojas</li>
            <li>📍 Geocodificação automática por endereço</li>
            <li>📱 Localização da loja mais próxima</li>
            <li>🔍 Filtros por estado e cidade</li>
            <li>📋 Lista detalhada com informações</li>
            <li>🚗 Rotas e direções</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeader from '@/components/ui/SectionHeader.vue'
</script>

