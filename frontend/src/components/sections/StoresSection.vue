<template>
  <section id="lojas" class="py-16 min-h-screen flex items-center bg-gray-50">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-8">
      <SectionHeader 
        title="Lojas Participantes" 
        subtitle="Lista completa das lojas onde a promoção é válida, com funcionalidade de geocodificação avançada que permite visualizar a loja participante mais próxima no mapa baseada na localização do usuário." 
      />

      <div v-if="loading" class="text-center py-16">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p class="mt-4 text-gray-700">Carregando lojas...</p>
      </div>

      <div v-else-if="error" class="text-center py-16 bg-red-50 rounded-xl">
        <p class="text-red-600 font-semibold">{{ error }}</p>
      </div>

      <div v-else class="space-y-6">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900">📍 Sua Localização</h3>
            <button 
              @click="getUserLocation"
              :disabled="loadingLocation"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loadingLocation">🔄 Obtendo...</span>
              <span v-else-if="userLocation">✓ Atualizar Localização</span>
              <span v-else>📍 Obter Minha Localização</span>
            </button>
          </div>
          
          <p v-if="userLocation" class="text-sm text-green-600 font-medium">
            ✓ Localização obtida! Mostrando lojas mais próximas.
          </p>
          <p v-else class="text-sm text-gray-500">
            Clique no botão para encontrar as lojas mais próximas de você.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl shadow-lg p-6 h-[600px] relative z-0 isolate">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-900">Mapa de Lojas</h3>
            </div>
            <div ref="mapContainer" class="w-full h-[520px] rounded-lg overflow-hidden relative z-0"></div>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 h-[600px] flex flex-col">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl font-bold text-gray-900">Todas as Lojas</h3>
            </div>

            <div class="mb-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Buscar por nome</label>
                  <input 
                    v-model="searchNameInput"
                    type="text"
                    placeholder="Digite o nome da loja..."
                    @keyup.enter="applyFilters"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Buscar por estado</label>
                  <input 
                    v-model="searchStateInput"
                    type="text"
                    placeholder="Ex: SP, RJ, MG..."
                    @keyup.enter="applyFilters"
                    maxlength="2"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm uppercase"
                  />
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  @click="applyFilters"
                  class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  🔍 Aplicar Filtros
                </button>
                <button
                  v-if="appliedSearchName || appliedSearchState"
                  @click="clearFilters"
                  class="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
                >
                  ✕ Limpar
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between mb-3 text-sm text-gray-700">
              <p>{{ totalStores }} loja(s) encontrada(s) - Página {{ currentPage }} de {{ totalPages }}</p>
              <select 
                v-model="itemsPerPage"
                class="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option :value="5">5 por página</option>
                <option :value="10">10 por página</option>
                <option :value="20">20 por página</option>
              </select>
            </div>

            <div class="flex-1 overflow-y-auto pr-2 mb-3 space-y-3 relative">
              <div v-if="loadingList" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
                <div class="text-center">
                  <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                  <p class="mt-2 text-sm text-gray-700">Atualizando...</p>
                </div>
              </div>
              
              <div 
                v-for="store in stores" 
                :key="store.id"
                class="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h4 class="font-bold text-gray-900 text-lg">{{ store.name }}</h4>
                    <p class="text-sm text-gray-700 mt-1">
                      <span class="inline-flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                        </svg>
                        {{ store.city }} - {{ store.state }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 mt-1">{{ store.address }}</p>
                    <p v-if="store.distance" class="text-blue-600 font-semibold mt-2 text-sm">
                      📏 {{ store.distance.toFixed(1) }} km de você
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="stores.length === 0 && !loadingList" class="flex-1 flex items-center justify-center text-gray-500">
              <div class="text-center">
                <svg class="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p>Nenhuma loja encontrada.</p>
              </div>
            </div>

            <div v-if="totalPages > 0" class="flex items-center justify-between pt-3 mt-3 border-t border-gray-200">
              <button 
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                :class="[
                  'px-4 py-2 rounded-lg border transition-all font-medium',
                  currentPage === 1
                    ? 'opacity-50 cursor-not-allowed bg-gray-50 text-gray-400'
                    : 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
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
                        ? 'bg-blue-600 text-white font-bold shadow-md' 
                        : 'border border-gray-300 hover:bg-blue-50 hover:border-blue-300'
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
                    : 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
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
import { storesApi, type Store } from '@/services/storesApi'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface StoreWithDistance extends Store {
  distance?: number
}

const stores = ref<StoreWithDistance[]>([])
const loading = ref(true)
const loadingList = ref(false)
const loadingLocation = ref(false)
const error = ref('')

const searchNameInput = ref('')
const searchStateInput = ref('')
const appliedSearchName = ref('')
const appliedSearchState = ref('')

const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalStores = ref(0)
const totalPages = ref(0)

const userLocation = ref<{ lat: number; lng: number} | null>(null)
const mapContainer = ref<HTMLElement | null>(null)
const isMapInitialized = ref(false)
let map: L.Map | null = null
let markers: L.Marker[] = []

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

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

const getUserLocation = () => {
  if (!navigator.geolocation) {
    alert('❌ Geolocalização não é suportada pelo seu navegador')
    return
  }

  loadingLocation.value = true

  const options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 300000
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      loadingLocation.value = false
      
      if (map && userLocation.value) {
        L.marker([userLocation.value.lat, userLocation.value.lng], {
          icon: L.divIcon({
            className: 'user-location-marker',
            html: '<div class="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg"></div>',
            iconSize: [24, 24]
          })
        }).addTo(map)
          .bindPopup('📍 Você está aqui')
        
        map.setView([userLocation.value.lat, userLocation.value.lng], 12)
      }
      
      calculateStoresDistance()
    },
    (err) => {
      loadingLocation.value = false
      
      let errorMessage = '❌ Não foi possível obter sua localização.\n\n'
      
      switch(err.code) {
        case err.PERMISSION_DENIED:
          errorMessage += '🔒 Permissão negada.\n\nPara permitir:\n1. Clique no ícone 🔒 ao lado da URL\n2. Permita "Localização"\n3. Recarregue a página'
          break
        case err.POSITION_UNAVAILABLE:
          errorMessage += '📡 Localização indisponível. Verifique se o GPS está ativo.'
          break
        case err.TIMEOUT:
          errorMessage += '⏱️ Tempo esgotado. Tente novamente.'
          break
        default:
          errorMessage += '❓ Erro desconhecido ao obter localização.'
      }
      
      alert(errorMessage)
    },
    options
  )
}

const calculateStoresDistance = () => {
  if (!userLocation.value) return
  
  stores.value = stores.value.map(store => {
    if (store.latitude && store.longitude) {
      const distance = calculateDistance(
        userLocation.value!.lat,
        userLocation.value!.lng,
        store.latitude,
        store.longitude
      )
      return { ...store, distance }
    }
    return store
  })
  
  stores.value.sort((a, b) => {
    if (a.distance === undefined) return 1
    if (b.distance === undefined) return -1
    return a.distance - b.distance
  })
}

const applyFilters = () => {
  appliedSearchName.value = searchNameInput.value
  appliedSearchState.value = searchStateInput.value
  currentPage.value = 1
  fetchStores()
}

const clearFilters = () => {
  searchNameInput.value = ''
  searchStateInput.value = ''
  appliedSearchName.value = ''
  appliedSearchState.value = ''
  currentPage.value = 1
  fetchStores()
}

const initMap = () => {
  if (map || !mapContainer.value) {
    return
  }
  
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

    updateMarkers()
  } catch (err) {
    error.value = 'Erro ao inicializar o mapa'
  }
}

const updateMarkers = () => {
  if (!map) {
    return
  }

  markers.forEach(marker => marker.remove())
  markers = []

  stores.value.forEach(store => {
    if (store.latitude && store.longitude) {
      const marker = L.marker([store.latitude, store.longitude]).addTo(map!)

      const popupContent = `
        <div class="p-2">
          <h3 class="font-bold text-blue-600 mb-2">${store.name}</h3>
          <p class="text-sm text-gray-700">${store.address}</p>
          <p class="text-sm text-gray-700">${store.city} - ${store.state}</p>
          ${store.distance ? `<p class="text-sm text-blue-600 font-semibold mt-1">📏 ${store.distance.toFixed(1)} km</p>` : ''}
        </div>
      `

      marker.bindPopup(popupContent)
      markers.push(marker)
    }
  })

  if (userLocation.value && map) {
    map.setView([userLocation.value.lat, userLocation.value.lng], 12)
  } else if (stores.value.length > 0) {
    const firstStore = stores.value[0]
    if (firstStore && firstStore.latitude && firstStore.longitude) {
      map.setView([firstStore.latitude, firstStore.longitude], 6)
    }
  }
}

const fetchStores = async () => {
  try {
    const isFirstLoad = !isMapInitialized.value
    
    if (isFirstLoad) {
      loading.value = true
    } else {
      loadingList.value = true
    }
    
    error.value = ''

    const filters = {
      name: appliedSearchName.value.trim() || undefined,
      state: appliedSearchState.value.trim().toUpperCase() || undefined,
    }

    const pagination = {
      page: currentPage.value,
      limit: itemsPerPage.value,
    }

    const storesResponse = await storesApi.getStores(filters, pagination)

    stores.value = storesResponse.data
    totalStores.value = storesResponse.total
    totalPages.value = storesResponse.totalPages

    if (userLocation.value) {
      calculateStoresDistance()
    }

    loading.value = false
    loadingList.value = false
    
    await nextTick()
    if (!isMapInitialized.value) {
      setTimeout(() => {
        initMap()
        isMapInitialized.value = true
      }, 100)
    } else {
      updateMarkers()
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro desconhecido'
    loading.value = false
    loadingList.value = false
  }
}

watch(currentPage, () => {
  fetchStores()
})

watch(itemsPerPage, () => {
  currentPage.value = 1
  fetchStores()
})

onMounted(() => {
  fetchStores()
})
</script>

<style scoped>
:deep(.leaflet-container) {
  background: #eff6ff;
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 0.5rem;
}

:deep(.user-location-marker) {
  background: transparent;
  border: none;
}
</style>

