<template>
  <header 
    class="fixed top-0 left-0 right-0 h-header backdrop-blur-md border-b z-50 transition-all duration-300"
    :class="{ 
      'bg-white/95 border-gray-200 shadow-soft': isScrolled,
      'bg-transparent border-transparent': !isScrolled 
    }"
  >
    <div class="w-full max-w-6xl mx-auto px-4 sm:px-8">
      <div class="flex items-center justify-between h-full py-4">
        <div class="flex items-center">
          <router-link 
            to="/" 
            class="text-2xl font-extrabold transition-colors duration-300" 
            :class="isScrolled ? 'text-purple-600 hover:text-purple-700' : 'text-white hover:text-gray-100'"
            @click="scrollToSection('home')"
          >
            PromoçãoTop
          </router-link>
        </div>
        <nav 
          class="fixed inset-0 bg-white/98 backdrop-blur-md flex flex-col justify-center gap-12 lg:relative lg:inset-auto lg:bg-transparent lg:backdrop-blur-none lg:flex lg:items-center transition-transform duration-300 lg:translate-x-0"
          :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
        >
          <ul class="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
            <li>
              <a 
                href="#home" 
                class="font-medium px-4 py-2 transition-all duration-200 hover:scale-105 text-xl lg:text-base"
                :class="activeSection === 'home' 
                  ? (isScrolled ? 'text-purple-600' : 'text-yellow-300') 
                  : (isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-gray-200')"
                @click="handleNavClick('home')"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#como-participar" 
                class="font-medium px-4 py-2 transition-all duration-200 hover:scale-105 text-xl lg:text-base"
                :class="activeSection === 'como-participar' 
                  ? (isScrolled ? 'text-purple-600' : 'text-yellow-300') 
                  : (isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-gray-200')"
                @click="handleNavClick('como-participar')"
              >
                Como Participar
              </a>
            </li>
            <li>
              <a 
                href="#premios" 
                class="font-medium px-4 py-2 transition-all duration-200 hover:scale-105 text-xl lg:text-base"
                :class="activeSection === 'premios' 
                  ? (isScrolled ? 'text-purple-600' : 'text-yellow-300') 
                  : (isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-gray-200')"
                @click="handleNavClick('premios')"
              >
                Prêmios
              </a>
            </li>
            <li>
              <a 
                href="#faq" 
                class="font-medium px-4 py-2 transition-all duration-200 hover:scale-105 text-xl lg:text-base"
                :class="activeSection === 'faq' 
                  ? (isScrolled ? 'text-purple-600' : 'text-yellow-300') 
                  : (isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-gray-200')"
                @click="handleNavClick('faq')"
              >
                FAQ
              </a>
            </li>
            <li>
              <a 
                href="#ganhadores" 
                class="font-medium px-4 py-2 transition-all duration-200 hover:scale-105 text-xl lg:text-base"
                :class="activeSection === 'ganhadores' 
                  ? (isScrolled ? 'text-purple-600' : 'text-yellow-300') 
                  : (isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-gray-200')"
                @click="handleNavClick('ganhadores')"
              >
                Ganhadores
              </a>
            </li>
            <li>
              <a 
                href="#lojas" 
                class="font-medium px-4 py-2 transition-all duration-200 hover:scale-105 text-xl lg:text-base"
                :class="activeSection === 'lojas' 
                  ? (isScrolled ? 'text-purple-600' : 'text-yellow-300') 
                  : (isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-gray-200')"
                @click="handleNavClick('lojas')"
              >
                Lojas
              </a>
            </li>
          </ul>
          
          <div class="flex items-center justify-center lg:hidden">
            <a 
              href="https://app.promocao.com/login" 
              class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg px-8 py-3 text-lg"
              :class="isScrolled 
                ? 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500' 
                : 'bg-white text-purple-600 hover:bg-gray-100 focus:ring-white'"
              target="_blank" 
              rel="noopener noreferrer"
              @click="closeMobileMenu"
            >
              Login
            </a>
          </div>
        </nav>

        <div class="hidden lg:flex items-center">
          <a 
            href="https://app.promocao.com/login" 
            class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg px-6 py-2.5"
            :class="isScrolled 
              ? 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500' 
              : 'bg-white text-purple-600 hover:bg-gray-100 focus:ring-white'"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Login
          </a>
        </div>


        <button 
          class="flex flex-col justify-between w-7 h-5 lg:hidden z-50"
          :class="{ 'hamburger-active': isMobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Menu"
          :aria-expanded="isMobileMenuOpen"
        >
          <span class="w-full h-0.5 bg-gray-700 transition-all duration-150 origin-center hamburger-line"></span>
          <span class="w-full h-0.5 bg-gray-700 transition-all duration-150 origin-center hamburger-line"></span>
          <span class="w-full h-0.5 bg-gray-700 transition-all duration-150 origin-center hamburger-line"></span>
        </button>
      </div>
    </div>
  </header>
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
  transform: translateY(8px) rotate(45deg);
}

.hamburger-active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger-active .hamburger-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}
</style>
