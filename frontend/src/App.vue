<template>
  <div id="app">
    <AppHeader />
    
    <main>
      <router-view />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const router = useRouter()

router.afterEach((to) => {
  const title = to.meta.title as string || 'Promoção Especial'
  document.title = title
})

onMounted(() => {
  document.body.classList.add('js-enabled')
})
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
