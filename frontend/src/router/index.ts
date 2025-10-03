import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
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
  },
  {
    path: '/login',
    component: BlankLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: Login,
        meta: {
          title: 'Login - PromoçãoTop'
        }
      }
    ]
  }
]

export default routes
