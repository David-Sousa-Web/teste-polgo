<template>
  <section id="ganhadores" class="py-16 min-h-screen flex items-center bg-gradient-to-br from-purple-50 to-pink-50">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-8">
      <SectionHeader 
        title="Ganhadores" 
        subtitle="Veja quem já foi premiado em nossa promoção" 
      />

      <div v-if="loading" class="text-center py-16">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        <p class="mt-4 text-gray-600">Carregando ganhadores...</p>
      </div>

      <div v-else-if="error" class="text-center py-16 bg-red-50 rounded-xl">
        <p class="text-red-600 font-semibold">{{ error }}</p>
      </div>

      <div v-else>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          <div 
            v-for="state in stateAggregation" 
            :key="state.state"
            @click="selectState(state.state)"
            :class="[
              'p-3 rounded-lg cursor-pointer transition-all text-center flex flex-col items-center justify-center min-h-[90px]',
              selectedState === state.state 
                ? 'bg-purple-600 text-white shadow-lg transform scale-105' 
                : 'bg-white hover:bg-purple-50 hover:shadow-md border border-gray-100'
            ]"
          >
            <p class="text-xs font-bold mb-1">{{ state.state }}</p>
            <p :class="[
              'text-2xl font-bold mb-1',
              selectedState === state.state ? 'text-white' : 'text-purple-600'
            ]">{{ state.count }}</p>
            <p :class="[
              'text-[10px]',
              selectedState === state.state ? 'text-purple-100' : 'text-gray-500'
            ]">ganhador{{ state.count > 1 ? 'es' : '' }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl shadow-lg p-6 h-[600px]">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-800">Mapa do Brasil</h3>
              <button 
                v-if="selectedState"
                @click="selectedState = null"
                class="text-sm text-purple-600 hover:text-purple-700 font-semibold"
              >
                Ver todos
              </button>
            </div>
            <div ref="mapContainer" class="w-full h-[520px] rounded-lg overflow-hidden"></div>
          </div>

        <div class="bg-white rounded-xl shadow-lg p-6 h-[600px] flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-bold text-gray-800">
              {{ selectedState ? `Ganhadores - ${selectedState}` : 'Todos os Ganhadores' }}
            </h3>
            <button 
              v-if="selectedState"
              @click="selectState(null)"
              class="text-sm text-purple-600 hover:text-purple-700 font-semibold"
            >
              Ver todos
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1">Buscar por nome</label>
              <input 
                v-model="searchName"
                type="text"
                placeholder="Digite o nome..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1">Buscar por prêmio</label>
              <input 
                v-model="searchPrize"
                type="text"
                placeholder="Digite o prêmio..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>

          <div class="flex items-center justify-between mb-3 text-sm text-gray-600">
            <p>{{ filteredWinners.length }} ganhador(es) encontrado(s)</p>
            <select 
              v-model="itemsPerPage"
              class="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option :value="5">5 por página</option>
              <option :value="10">10 por página</option>
              <option :value="20">20 por página</option>
              <option :value="50">50 por página</option>
            </select>
          </div>

          <div class="flex-1 overflow-y-auto pr-2 mb-3 space-y-3">
            <div 
              v-for="winner in paginatedWinners" 
              :key="winner.id"
              class="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100 hover:shadow-md transition-shadow"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-bold text-gray-800 text-lg">{{ winner.fullName }}</h4>
                  <p class="text-sm text-gray-600 mt-1">
                    <span class="inline-flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                      {{ winner.city }} - {{ winner.state }}
                    </span>
                  </p>
                  <p class="text-purple-600 font-semibold mt-2">🎁 {{ winner.prize }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-500">Sorteio</p>
                  <p class="text-sm font-semibold text-gray-700">{{ formatDate(winner.drawDate) }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="filteredWinners.length === 0" class="flex-1 flex items-center justify-center text-gray-500">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Nenhum ganhador encontrado{{ selectedState ? ` em ${selectedState}` : '' }}.</p>
            </div>
          </div>

          <div v-if="totalPages > 1" class="flex items-center justify-between pt-3 mt-3 border-t border-gray-200">
            <button 
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              :class="[
                'px-4 py-2 rounded-lg border transition-all font-medium',
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed bg-gray-50 text-gray-400'
                  : 'hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700'
              ]"
            >
              ← Anterior
            </button>
            
            <div class="flex gap-1 items-center">
              <template v-for="(page, index) in visiblePages" :key="index">
                <span 
                  v-if="page < 0" 
                  class="w-8 h-8 flex items-center justify-center text-gray-400"
                >
                  ...
                </span>
                <button
                  v-else
                  @click="currentPage = page"
                  :class="[
                    'w-8 h-8 rounded-lg transition-colors font-medium',
                    currentPage === page 
                      ? 'bg-purple-600 text-white font-bold shadow-md' 
                      : 'border border-gray-300 hover:bg-purple-50 hover:border-purple-300'
                  ]"
                >
                  {{ page }}
                </button>
              </template>
            </div>

            <button 
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              :class="[
                'px-4 py-2 rounded-lg border transition-all font-medium',
                currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed bg-gray-50 text-gray-400'
                  : 'hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700'
              ]"
            >
              Próximo →
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import L from 'leaflet'
import SectionHeader from '@/components/ui/SectionHeader.vue'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface Winner {
  id: string
  fullName: string
  state: string
  city: string
  prize: string
  drawDate: string
}

interface StateAggregation {
  state: string
  count: number
}

const winners = ref<Winner[]>([])
const stateAggregation = ref<StateAggregation[]>([])
const loading = ref(true)
const error = ref('')
const selectedState = ref<string | null>(null)
const searchName = ref('')
const searchPrize = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let markers: L.Marker[] = []

const stateCoordinates: Record<string, [number, number]> = {
  'AC': [-9.0238, -70.812],
  'AL': [-9.5713, -36.782],
  'AP': [0.9020, -52.003],
  'AM': [-3.4168, -65.8561],
  'BA': [-12.5797, -41.7007],
  'CE': [-5.4984, -39.3206],
  'DF': [-15.7939, -47.8828],
  'ES': [-19.1834, -40.3089],
  'GO': [-15.8270, -49.8362],
  'MA': [-4.9609, -45.2744],
  'MT': [-12.6819, -56.9211],
  'MS': [-20.7722, -54.7852],
  'MG': [-18.5122, -44.5550],
  'PA': [-1.9981, -54.9306],
  'PB': [-7.2400, -36.7820],
  'PR': [-24.8933, -51.4351],
  'PE': [-8.8137, -36.9541],
  'PI': [-7.7183, -42.7289],
  'RJ': [-22.9099, -43.2095],
  'RN': [-5.4026, -36.9541],
  'RS': [-30.0346, -51.2177],
  'RO': [-10.8961, -62.9310],
  'RR': [2.7376, -62.0751],
  'SC': [-27.2423, -50.2189],
  'SP': [-23.5505, -46.6333],
  'SE': [-10.5741, -37.3857],
  'TO': [-10.1753, -48.2982]
}

const filteredWinners = computed(() => {
  let filtered = winners.value

  if (selectedState.value) {
    filtered = filtered.filter(w => w.state === selectedState.value)
  }

  if (searchName.value.trim()) {
    filtered = filtered.filter(w => 
      w.fullName.toLowerCase().includes(searchName.value.toLowerCase())
    )
  }

  if (searchPrize.value.trim()) {
    filtered = filtered.filter(w => 
      w.prize.toLowerCase().includes(searchPrize.value.toLowerCase())
    )
  }

  return filtered
})

const paginatedWinners = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredWinners.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredWinners.value.length / itemsPerPage.value)
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 1) return pages
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    
    if (current > 3) {
      pages.push(-1)
    }
    
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== total) {
        pages.push(i)
      }
    }
    
    if (current < total - 2) {
      pages.push(-2)
    }
    
    pages.push(total)
  }
  
  return pages
})

const selectState = (uf: string | null) => {
  if (uf === null) {
    selectedState.value = null
  } else {
    selectedState.value = selectedState.value === uf ? null : uf
  }
  currentPage.value = 1
}

const initMap = () => {
  if (!mapContainer.value) {
    console.error('Map container not found')
    return
  }

  console.log('Initializing map...')
  
  try {
    map = L.map(mapContainer.value, {
      center: [-14.2350, -51.9253],
      zoom: 4,
      zoomControl: true
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
      minZoom: 3
    }).addTo(map)

    console.log('Map initialized successfully')
    updateMarkers()
  } catch (error) {
    console.error('Error initializing map:', error)
  }
}

const updateMarkers = () => {
  if (!map) {
    console.error('Map not initialized')
    return
  }

  console.log('Updating markers...', winners.value.length, 'winners')

  markers.forEach(marker => marker.remove())
  markers = []

  const winnersToShow = selectedState.value 
    ? winners.value.filter(w => w.state === selectedState.value)
    : winners.value

  console.log('Winners to show:', winnersToShow.length)

  const stateGroups = winnersToShow.reduce((acc, winner) => {
    if (!acc[winner.state]) {
      acc[winner.state] = []
    }
    acc[winner.state]!.push(winner)
    return acc
  }, {} as Record<string, Winner[]>)

  console.log('State groups:', Object.keys(stateGroups).length)

  Object.entries(stateGroups).forEach(([state, stateWinners]) => {
    const coords = stateCoordinates[state]
    if (!coords) return

    const marker = L.marker(coords, {
      icon: L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="flex items-center justify-center w-10 h-10 bg-purple-600 text-white rounded-full shadow-lg border-2 border-white font-bold text-sm">
            ${stateWinners.length}
          </div>
        `,
        iconSize: [40, 40]
      })
    }).addTo(map!)

    const popupContent = `
      <div class="p-2">
        <h3 class="font-bold text-purple-600 mb-2">${state} - ${stateWinners.length} ganhador(es)</h3>
        ${stateWinners.slice(0, 3).map(w => `
          <div class="mb-2 text-sm">
            <p class="font-semibold">${w.fullName}</p>
            <p class="text-gray-600 text-xs">${w.city}</p>
          </div>
        `).join('')}
        ${stateWinners.length > 3 ? `<p class="text-xs text-gray-500 mt-1">+ ${stateWinners.length - 3} mais...</p>` : ''}
      </div>
    `

    marker.bindPopup(popupContent)
    marker.on('click', () => {
      selectedState.value = state
    })

    markers.push(marker)
  })

  if (selectedState.value && stateCoordinates[selectedState.value]) {
    const coords = stateCoordinates[selectedState.value]
    if (coords) {
      map.setView(coords, 6)
    }
  } else {
    map.setView([-14.2350, -51.9253], 4)
  }
}

watch(selectedState, () => {
  updateMarkers()
})

watch([searchName, searchPrize], () => {
  currentPage.value = 1
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  })
}

const fetchWinners = async () => {
  try {
    loading.value = true
    error.value = ''

    const [winnersResponse, aggregationResponse] = await Promise.all([
      fetch('http://localhost:3333/api/ganhadores?limit=100'),
      fetch('http://localhost:3333/api/ganhadores/agregacao')
    ])

    if (!winnersResponse.ok || !aggregationResponse.ok) {
      throw new Error('Erro ao carregar dados dos ganhadores')
    }

    const winnersData = await winnersResponse.json()
    const aggregationData = await aggregationResponse.json()

    winners.value = winnersData.data || []
    stateAggregation.value = aggregationData.data || []

    loading.value = false
    
    await nextTick()
    setTimeout(() => {
      initMap()
    }, 100)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro ao buscar ganhadores:', err)
    loading.value = false
  }
}

onMounted(() => {
  fetchWinners()
})
</script>

<style scoped>
:deep(.leaflet-container) {
  background: #f0f9ff;
}

:deep(.custom-marker) {
  background: transparent;
  border: none;
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 0.5rem;
}
</style>

