import { createRouter, createWebHistory } from 'vue-router'

import FirstExampleVue from '../views/FirstExample.vue'
import SecondExampleVue from '../views/SecondExample.vue'
import FixAllConditionVue from '../views/FixAllCondition.vue'
import MockExampleVue from '../views/MockExample.vue'
import GetExampleVue from '../views/tanstack/GetExample.vue'
import PostExampleVue from '../views/tanstack/PostExample.vue'

const routes = [
  { path: '/', component: FirstExampleVue },
  { path: '/second', component: SecondExampleVue },
  { path: '/fix-all-condition', component: FixAllConditionVue },
  { path: '/mock-example', component: MockExampleVue },
  { path: '/get-tanstack-example', component: GetExampleVue },
  { path: '/post-tanstack-example', component: PostExampleVue },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})