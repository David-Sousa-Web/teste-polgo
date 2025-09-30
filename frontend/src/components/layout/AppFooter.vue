<template>
  <footer class="bg-gradient-to-br from-slate-800 to-slate-700 text-slate-200 pt-12 pb-4 mt-auto">
    <div class="w-full max-w-6xl mx-auto px-4 sm:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        <div class="lg:col-span-2 max-w-md">
          <h3 class="text-primary-400 text-3xl font-extrabold mb-4">PromoçãoTop</h3>
          <p class="text-slate-400 leading-relaxed mb-8">
            Sua chance de ganhar prêmios incríveis! Participe da nossa promoção e concorra a diversos brindes.
          </p>
          
          <div>
            <h4 class="text-slate-100 font-semibold mb-4">Siga-nos</h4>
            <div class="flex gap-4">
              <a 
                href="https://facebook.com/promocao" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full transition-all duration-150 text-slate-200 hover:bg-primary-500 hover:-translate-y-0.5" 
                aria-label="Facebook"
              >
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/promocao" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full transition-all duration-150 text-slate-200 hover:bg-primary-500 hover:-translate-y-0.5" 
                aria-label="Instagram"
              >
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zm4.624 8.006c0 .556-.451 1.007-1.007 1.007-.556 0-1.007-.451-1.007-1.007s.451-1.007 1.007-1.007 1.007.451 1.007 1.007zm-1.007 9.981c-2.761 0-5.002-2.241-5.002-5.002s2.241-5.002 5.002-5.002 5.002 2.241 5.002 5.002-2.241 5.002-5.002 5.002zm0-8.003c-1.658 0-3.001 1.343-3.001 3.001s1.343 3.001 3.001 3.001 3.001-1.343 3.001-3.001-1.343-3.001-3.001-3.001z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com/promocao" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full transition-all duration-150 text-slate-200 hover:bg-primary-500 hover:-translate-y-0.5" 
                aria-label="Twitter"
              >
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com/promocao" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full transition-all duration-150 text-slate-200 hover:bg-primary-500 hover:-translate-y-0.5" 
                aria-label="YouTube"
              >
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <h4 class="text-slate-100 font-semibold mb-4">Navegação</h4>
          <ul class="space-y-3">
            <li><a href="#home" class="transition-colors duration-150 cursor-pointer text-slate-400 hover:text-primary-400" @click="scrollToSection('home')">Home</a></li>
            <li><a href="#como-participar" class="transition-colors duration-150 cursor-pointer text-slate-400 hover:text-primary-400" @click="scrollToSection('como-participar')">Como Participar</a></li>
            <li><a href="#premios" class="transition-colors duration-150 cursor-pointer text-slate-400 hover:text-primary-400" @click="scrollToSection('premios')">Prêmios</a></li>
            <li><a href="#ganhadores" class="transition-colors duration-150 cursor-pointer text-slate-400 hover:text-primary-400" @click="scrollToSection('ganhadores')">Ganhadores</a></li>
            <li><a href="#lojas" class="transition-colors duration-150 cursor-pointer text-slate-400 hover:text-primary-400" @click="scrollToSection('lojas')">Lojas</a></li>
          </ul>
        </div>

        <div class="lg:col-span-1">
          <h4 class="text-slate-100 font-semibold mb-4">Informações</h4>
          <ul class="space-y-3">
            <li><a href="/regulamento" class="transition-colors duration-150 cursor-pointer text-slate-400 hover:text-primary-400" target="_blank">Regulamento</a></li>
            <li><a href="/termos" class="transition-colors duration-150 cursor-pointer text-slate-400 hover:text-primary-400" target="_blank">Termos de Uso</a></li>
            <li><a href="/privacidade" class="transition-colors duration-150 cursor-pointer text-slate-400 hover:text-primary-400" target="_blank">Política de Privacidade</a></li>
            <li><a href="#faq" class="transition-colors duration-150 cursor-pointer text-slate-400 hover:text-primary-400" @click="scrollToSection('faq')">Perguntas Frequentes</a></li>
          </ul>
        </div>

        <div class="lg:col-span-1">
          <h4 class="text-slate-100 font-semibold mb-4">Contato</h4>
          <div class="space-y-3">
            <div class="flex items-center gap-3 text-slate-400 text-sm">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" class="text-primary-400 flex-shrink-0">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
              </svg>
              <span>contato@promocao.com</span>
            </div>
            <div class="flex items-center gap-3 text-slate-400 text-sm">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" class="text-primary-400 flex-shrink-0">
                <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"/>
              </svg>
              <span>(11) 99999-9999</span>
            </div>
            <div class="flex items-center gap-3 text-slate-400 text-sm">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" class="text-primary-400 flex-shrink-0">
                <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"/>
              </svg>
              <span>São Paulo, SP</span>
            </div>
          </div>
        </div>
      </div>

      <div class="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8"></div>

      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
        <p>&copy; 2023 PromoçãoTop. Todos os direitos reservados.</p>
        <p class="italic opacity-80">
          Esta é uma promoção fictícia criada para fins de demonstração técnica.
        </p>
      </div>
    </div>
  </footer>
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

