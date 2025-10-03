<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

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
}
</style>
