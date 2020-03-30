import Vue from 'vue'
import VueRouter from 'vue-router'
import Random from '../views/Random.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Random',
    component: Random
  },
  {
    path: '/sample/:sampleId',
    name: 'Sample',
    component: Random
  },
  {
    path: '/patchlist',
    name: 'Patchlist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Patchlist.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
