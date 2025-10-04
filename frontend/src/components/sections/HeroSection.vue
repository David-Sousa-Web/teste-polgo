<template>
  <section 
    id="home" 
    class="pt-32 min-h-screen flex items-center bg-gradient-to-br from-blue-500 via-purple-600 to-purple-700 text-white relative overflow-hidden"
  >
    <div class="w-full max-w-6xl mx-auto px-4 sm:px-8">
      <div class="text-center max-w-4xl mx-auto z-10 relative animate-fade-in-up">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight">
          Participe da Nossa
          <span class="block bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
            Promoção
          </span>
        </h1>
        
        <p class="text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto text-white">
          Concorra a prêmios incríveis e transforme sua vida! Tenha a chance de ganhar produtos exclusivos, viagens dos sonhos e muito mais.
        </p>
        
        <div class="flex justify-center">
          <a 
            href="#como-participar" 
            class="inline-flex items-center justify-center gap-2 px-10 py-4 text-xl font-semibold rounded-lg transition-all duration-150 outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer border-2 border-white text-white hover:bg-white hover:text-purple-600" 
            @click="scrollToSection('como-participar')"
          >
            Como Funciona
          </a>
        </div>
      </div>
      
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute top-1/5 right-1/3 w-3 h-3 bg-yellow-300/60 rounded-full animate-float" style="animation-delay: 0.5s;"></div>
        <div class="absolute top-2/5 left-1/4 w-2 h-2 bg-orange-300/50 rounded-full animate-float" style="animation-delay: 1.2s;"></div>
        <div class="absolute bottom-1/5 right-1/6 w-4 h-4 bg-pink-300/40 rounded-full animate-float" style="animation-delay: 0.8s;"></div>
        <div class="absolute top-3/5 right-1/4 w-2 h-2 bg-purple-300/50 rounded-full animate-float" style="animation-delay: 1.8s;"></div>

        <div class="absolute top-1/6 left-3/4 w-6 h-6 bg-yellow-300/40 animate-spin-slow" style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); animation-delay: 0.3s;"></div>
        <div class="absolute bottom-1/6 left-1/5 w-8 h-8 bg-orange-300/35 animate-spin-slow" style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); animation-delay: 1.5s;"></div>
        <div class="absolute top-1/2 right-1/8 w-5 h-5 bg-pink-300/45 animate-spin-slow" style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); animation-delay: 2.2s;"></div>

        <div class="absolute top-0 left-1/4 w-2 h-6 bg-gradient-to-b from-yellow-400 to-orange-400 animate-confetti" style="animation-delay: 0.2s;"></div>
        <div class="absolute top-0 left-1/2 w-2 h-4 bg-gradient-to-b from-purple-400 to-pink-400 animate-confetti" style="animation-delay: 0.8s;"></div>
        <div class="absolute top-0 left-3/4 w-2 h-5 bg-gradient-to-b from-blue-400 to-cyan-400 animate-confetti" style="animation-delay: 1.4s;"></div>
        <div class="absolute top-0 right-1/6 w-2 h-4 bg-gradient-to-b from-green-400 to-emerald-400 animate-confetti" style="animation-delay: 0.6s;"></div>

        <div class="absolute top-1/4 right-1/6 w-24 h-24 bg-white/10 rounded-full animate-pulse-slow"></div>
        <div class="absolute bottom-1/4 left-1/3 w-16 h-16 bg-yellow-300/15 rounded-full animate-pulse-slow" style="animation-delay: 0.7s;"></div>
        <div class="absolute top-3/4 right-1/3 w-20 h-20 bg-purple-300/10 rounded-full animate-pulse-slow" style="animation-delay: 1.3s;"></div>

        <div class="absolute top-1/3 left-1/12 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent animate-shimmer" style="transform: rotate(15deg); animation-delay: 0.4s;"></div>
        <div class="absolute bottom-1/3 right-1/12 w-28 h-1 bg-gradient-to-r from-transparent via-purple-300/25 to-transparent animate-shimmer" style="transform: rotate(-20deg); animation-delay: 1.1s;"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 80
    const elementPosition = element.offsetTop - headerHeight
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(120deg); }
  66% { transform: translateY(-5px) rotate(240deg); }
}

@keyframes confetti {
  0% { transform: translateY(-100vh) rotateZ(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotateZ(360deg); opacity: 0; }
}

@keyframes shimmer {
  0% { opacity: 0; transform: translateX(-100%); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateX(100%); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-confetti {
  animation: confetti 8s linear infinite;
}

.animate-shimmer {
  animation: shimmer 3s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin 8s linear infinite;
}

.animate-pulse-slow {
  animation: pulse 4s ease-in-out infinite;
}
</style>

