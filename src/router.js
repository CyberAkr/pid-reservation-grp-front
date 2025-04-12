import { createRouter, createWebHistory } from 'vue-router'
import AccueilPage from './components/AccueilPage.vue'
import ShowsPage from './components/ShowsPage.vue'
import ShowDetailPage from './components/ShowDetailPage.vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

const routes = [
  {
    path: '/',
    name: 'accueil',
    component: AccueilPage
  },
  {
    path: '/shows',
    name: 'shows',
    component: ShowsPage
  },
  {
    path: '/shows/:id',
    name: 'show-detail',
    component: ShowDetailPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterForm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router