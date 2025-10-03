<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center transform hover:scale-105 transition-transform duration-300">
        <div class="mb-6">
          <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="text-3xl font-extrabold text-gray-900 mb-2">
            Área de Login
          </h1>
          <div class="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full"></div>
        </div>

        <div class="space-y-4 mb-8">
          <p class="text-lg text-gray-700 leading-relaxed">
            Aqui é onde você poderia fazer o <span class="font-semibold text-purple-600">login</span> ou 
            <span class="font-semibold text-purple-600">cadastrar-se</span> em nossa plataforma!
          </p>
          
          <div class="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
            <p class="text-sm text-gray-600">
              🎉 Em breve você poderá acessar sua conta e participar de promoções incríveis!
            </p>
          </div>
        </div>

        <div class="space-y-3">
          <router-link 
            to="/"
            class="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para Home
          </router-link>

          <button
            class="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-all duration-200"
            disabled
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Em desenvolvimento
          </button>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-200">
          <p class="text-xs text-gray-500">
            Esta é uma página placeholder. A funcionalidade de login será implementada em breve.
          </p>
        </div>
      </div>

      <div class="mt-6 text-center">
        <p class="text-white text-sm drop-shadow-md">
          <router-link to="/" class="hover:underline font-semibold">
            PromoçãoTop
          </router-link>
          - Sua plataforma de promoções
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Login - PromoçãoTop'
})
</script>

