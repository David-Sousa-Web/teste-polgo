<template>
  <section id="faq" class="py-16 min-h-screen flex items-center bg-gray-50">
    <div class="w-full max-w-6xl mx-auto px-4 sm:px-8">
      <SectionHeader 
        title="Perguntas Frequentes" 
        subtitle="Tire suas dúvidas sobre a promoção" 
      />

      <div class="max-w-lg mx-auto mb-8">
        <input 
          type="text" 
          v-model="searchTerm" 
          placeholder="Buscar pergunta..."
          class="w-full px-6 py-4 border border-gray-300 rounded-xl text-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-150 bg-white"
        />
      </div>

      <div class="max-w-4xl mx-auto">
        <FaqItem
          v-for="faq in filteredFaqs"
          :key="faq.id"
          :faq="faq"
          :is-active="faq.id === activeFaqId"
          @toggle="toggleFaq(faq.id)"
        />
      </div>
      <div v-if="filteredFaqs.length === 0" class="text-center py-12">
        <p class="text-lg text-gray-600 mb-6">Nenhuma pergunta encontrada para "<strong>{{ searchTerm }}</strong>"</p>
        <button @click="searchTerm = ''" class="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-lg transition-all duration-150 outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500">
          Limpar busca
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import FaqItem from '@/components/ui/FaqItem.vue'

const searchTerm = ref('')
const activeFaqId = ref<number | null>(null)

const faqs = ref([
  {
    id: 1,
    question: 'Como faço para participar da promoção?',
    answer: 'Para participar, basta realizar compras nos estabelecimentos participantes e cadastrar suas notas fiscais no aplicativo da campanha.'
  },
  {
    id: 2,
    question: 'Quais são os prêmios da campanha?',
    answer: 'Os prêmios incluem Smart TVs, smartphones de última geração, viagens e muitos outros. Consulte a seção de Prêmios para mais detalhes.'
  },
  {
    id: 3,
    question: 'Posso participar mais de uma vez?',
    answer: 'Sim, cada nota fiscal cadastrada gera uma nova chance de ganhar, desde que atenda aos requisitos do regulamento.'
  },
  {
    id: 4,
    question: 'Onde posso encontrar o regulamento completo?',
    answer: 'O regulamento completo está disponível para consulta no rodapé da página principal da campanha.'
  }
])

const filteredFaqs = computed(() => {
  if (!searchTerm.value) return faqs.value
  
  const search = searchTerm.value.toLowerCase()
  return faqs.value.filter(faq => 
    faq.question.toLowerCase().includes(search) ||
    faq.answer.toLowerCase().includes(search)
  )
})

const toggleFaq = (id: number) => {
  activeFaqId.value = activeFaqId.value === id ? null : id
}
</script>

