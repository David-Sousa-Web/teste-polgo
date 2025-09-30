import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Promoção Especial - Home'
    }
  },
  {
    path: '/home',
    redirect: { name: 'Home', hash: '#home' }
  },
  {
    path: '/como-participar',
    redirect: { name: 'Home', hash: '#como-participar' }
  },
  {
    path: '/premios',
    redirect: { name: 'Home', hash: '#premios' }
  },
  {
    path: '/faq',
    redirect: { name: 'Home', hash: '#faq' }
  },
  {
    path: '/ganhadores',
    redirect: { name: 'Home', hash: '#ganhadores' }
  },
  {
    path: '/lojas',
    redirect: { name: 'Home', hash: '#lojas' }
  }
]

export default routes
