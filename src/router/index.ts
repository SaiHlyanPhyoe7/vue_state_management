import { createRouter, createWebHistory } from 'vue-router'

import FirstExampleVue from '../views/FirstExample.vue'
import SecondExampleVue from '../views/SecondExample.vue'
import FixAllConditionVue from '../views/FixAllCondition.vue'
import MockExampleVue from '../views/MockExample.vue'

const routes = [
  { path: '/', component: FirstExampleVue },
  { path: '/second', component: SecondExampleVue },
  { path: '/fix-all-condition', component: FixAllConditionVue },
  { path: '/mock-example', component: MockExampleVue },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})