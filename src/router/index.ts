import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Lists from '../views/Lists.vue';
import All from '../views/All.vue';
import Work from '../views/Work.vue';
import Music from '../views/Music.vue';
import Travel from '../views/Travel.vue';
import Study from '../views/Study.vue';
import Sport from '../views/Sport.vue';
import Shopping from '../views/Shopping.vue'; 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Lists'
  },
  {
    path: '/Lists',
    name: 'Lists',
    component: Lists
  },
  {
    path: '/Maison',
    name: 'Home',
    component: Home
  },
  {
    path: '/Tous',
    name: 'All',
    component: All
  },
  {
    path: '/Travail',
    name: 'Work',
    component: Work
  },
  {
    path: '/Music',
    name: 'Music',
    component: Music
  },
  {
    path: '/Voyage',
    name: 'Travel',
    component: Travel
  },
  {
    path: '/Etudes',
    name: 'Study',
    component: Study
  },
  {
    path: '/Sport',
    name: 'Sport',
    component: Sport
  },
  {
    path: '/Shopping',
    name: 'Shopping',
    component: Shopping
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
