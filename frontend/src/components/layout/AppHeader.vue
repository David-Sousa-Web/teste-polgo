<template>
  <Transition name="fade">
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 bg-black/60 z-[60] lg:hidden"
      @click="closeMobileMenu"
    ></div>
  </Transition>

  <header 
    class="fixed top-0 left-0 right-0 h-header backdrop-blur-md border-b z-50 transition-all duration-300"
    :class="{ 
      'bg-white/95 border-gray-200 shadow-soft': isScrolled,
      'bg-transparent border-transparent': !isScrolled 
    }"
  >
    <div class="w-full max-w-6xl mx-auto px-4 sm:px-8">
      <div class="flex items-center justify-between h-full py-4">
        <div class="flex items-center relative z-50">
          <router-link 
            to="/" 
            class="text-2xl font-extrabold transition-colors duration-300" 
            :class="isScrolled ? 'text-purple-800 hover:text-purple-900' : 'text-white hover:text-gray-100'"
            @click="scrollToSection('home')"
          >
            PromoçãoTop
          </router-link>
        </div>

        <nav class="hidden lg:flex lg:items-center lg:gap-8">
          <a 
            href="#home" 
            class="font-medium px-4 py-2 transition-all duration-200 hover:scale-105"
            :class="activeSection === 'home' 
              ? (isScrolled ? 'text-purple-800' : 'text-white font-bold') 
              : (isScrolled ? 'text-gray-900 hover:text-purple-800' : 'text-white hover:text-gray-100')"
            @click="handleNavClick('home')"
          >
            Home
          </a>
          <a 
            href="#como-participar" 
            class="font-medium px-4 py-2 transition-all duration-200 hover:scale-105"
            :class="activeSection === 'como-participar' 
              ? (isScrolled ? 'text-purple-800' : 'text-white font-bold') 
              : (isScrolled ? 'text-gray-900 hover:text-purple-800' : 'text-white hover:text-gray-100')"
            @click="handleNavClick('como-participar')"
          >
            Como Participar
          </a>
          <a 
            href="#premios" 
            class="font-medium px-4 py-2 transition-all duration-200 hover:scale-105"
            :class="activeSection === 'premios' 
              ? (isScrolled ? 'text-purple-800' : 'text-white font-bold') 
              : (isScrolled ? 'text-gray-900 hover:text-purple-800' : 'text-white hover:text-gray-100')"
            @click="handleNavClick('premios')"
          >
            Prêmios
          </a>
          <a 
            href="#faq" 
            class="font-medium px-4 py-2 transition-all duration-200 hover:scale-105"
            :class="activeSection === 'faq' 
              ? (isScrolled ? 'text-purple-800' : 'text-white font-bold') 
              : (isScrolled ? 'text-gray-900 hover:text-purple-800' : 'text-white hover:text-gray-100')"
            @click="handleNavClick('faq')"
          >
            FAQ
          </a>
          <a 
            href="#ganhadores" 
            class="font-medium px-4 py-2 transition-all duration-200 hover:scale-105"
            :class="activeSection === 'ganhadores' 
              ? (isScrolled ? 'text-purple-800' : 'text-white font-bold') 
              : (isScrolled ? 'text-gray-900 hover:text-purple-800' : 'text-white hover:text-gray-100')"
            @click="handleNavClick('ganhadores')"
          >
            Ganhadores
          </a>
          <a 
            href="#lojas" 
            class="font-medium px-4 py-2 transition-all duration-200 hover:scale-105"
            :class="activeSection === 'lojas' 
              ? (isScrolled ? 'text-purple-800' : 'text-white font-bold') 
              : (isScrolled ? 'text-gray-900 hover:text-purple-800' : 'text-white hover:text-gray-100')"
            @click="handleNavClick('lojas')"
          >
            Lojas
          </a>
        </nav>

        <div class="hidden lg:flex items-center">
          <router-link 
            to="/login" 
            class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg px-6 py-2.5"
            :class="isScrolled 
              ? 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500' 
              : 'bg-white text-purple-600 hover:bg-gray-100 focus:ring-white'"
          >
            Login
          </router-link>
        </div>

        <button 
          class="flex flex-col justify-between w-8 h-6 lg:hidden relative z-50"
          :class="{ 'hamburger-active': isMobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Menu de navegação"
          :aria-expanded="isMobileMenuOpen"
        >
          <span 
            class="w-full h-0.5 rounded-full transition-all duration-300 origin-center hamburger-line"
            :class="isMobileMenuOpen ? 'bg-purple-600' : (isScrolled ? 'bg-gray-900' : 'bg-white')"
          ></span>
          <span 
            class="w-full h-0.5 rounded-full transition-all duration-300 origin-center hamburger-line"
            :class="isMobileMenuOpen ? 'bg-purple-600' : (isScrolled ? 'bg-gray-900' : 'bg-white')"
          ></span>
          <span 
            class="w-full h-0.5 rounded-full transition-all duration-300 origin-center hamburger-line"
            :class="isMobileMenuOpen ? 'bg-purple-600' : (isScrolled ? 'bg-gray-900' : 'bg-white')"
          ></span>
        </button>
      </div>
    </div>
  </header>

  <Transition name="slide">
    <nav 
      v-if="isMobileMenuOpen"
      class="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[320px] bg-white shadow-2xl overflow-y-auto lg:hidden z-[70]"
    >
      <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-purple-600">
        <h2 class="text-xl font-bold text-white">Menu</h2>
        <button 
          @click="closeMobileMenu"
          class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-purple-700 transition-colors"
          aria-label="Fechar menu"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="px-4 py-6">
        <ul class="space-y-2">
          <li>
            <a 
              href="#home" 
              class="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors"
              :class="activeSection === 'home' 
                ? 'bg-purple-50 text-purple-700' 
                : 'text-gray-900 hover:bg-gray-50 hover:text-purple-800'"
              @click="handleNavClick('home')"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </a>
          </li>
          <li>
            <a 
              href="#como-participar" 
              class="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors"
              :class="activeSection === 'como-participar' 
                ? 'bg-purple-50 text-purple-700' 
                : 'text-gray-900 hover:bg-gray-50 hover:text-purple-800'"
              @click="handleNavClick('como-participar')"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Como Participar
            </a>
          </li>
          <li>
            <a 
              href="#premios" 
              class="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors"
              :class="activeSection === 'premios' 
                ? 'bg-purple-50 text-purple-700' 
                : 'text-gray-900 hover:bg-gray-50 hover:text-purple-800'"
              @click="handleNavClick('premios')"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              Prêmios
            </a>
          </li>
          <li>
            <a 
              href="#faq" 
              class="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors"
              :class="activeSection === 'faq' 
                ? 'bg-purple-50 text-purple-700' 
                : 'text-gray-900 hover:bg-gray-50 hover:text-purple-800'"
              @click="handleNavClick('faq')"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQ
            </a>
          </li>
          <li>
            <a 
              href="#ganhadores" 
              class="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors"
              :class="activeSection === 'ganhadores' 
                ? 'bg-purple-50 text-purple-700' 
                : 'text-gray-900 hover:bg-gray-50 hover:text-purple-800'"
              @click="handleNavClick('ganhadores')"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Ganhadores
            </a>
          </li>
          <li>
            <a 
              href="#lojas" 
              class="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors"
              :class="activeSection === 'lojas' 
                ? 'bg-purple-50 text-purple-700' 
                : 'text-gray-900 hover:bg-gray-50 hover:text-purple-800'"
              @click="handleNavClick('lojas')"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Lojas
            </a>
          </li>
        </ul>

        <div class="mt-6 pt-6 border-t border-gray-200">
          <router-link 
            to="/login" 
            class="flex items-center justify-center gap-2 w-full px-6 py-3 text-base font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
            @click="closeMobileMenu"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Login
          </router-link>
        </div>
      </div>
    </nav>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('home')
const isAutoScrolling = ref(false)
let scrollTimeout: ReturnType<typeof setTimeout> | null = null

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  if (isAutoScrolling.value) {
    return
  }

  const sections = ['home', 'como-participar', 'premios', 'faq', 'ganhadores', 'lojas']

  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const rect = element.getBoundingClientRect()
      const headerHeight = 80

      if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
        activeSection.value = section
        break
      }
    }
  }
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 80
    const elementPosition = element.offsetTop - headerHeight

    isAutoScrolling.value = true
    activeSection.value = sectionId

    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })

    scrollTimeout = setTimeout(() => {
      isAutoScrolling.value = false
    }, 700)
  }
}

const handleNavClick = (sectionId: string) => {
  scrollToSection(sectionId)
  closeMobileMenu()
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value

  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', closeMobileMenu)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', closeMobileMenu)
  document.body.style.overflow = ''

  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
})
</script>

<style scoped>
.hamburger-active .hamburger-line:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}

.hamburger-active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px);
}

.hamburger-active .hamburger-line:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
