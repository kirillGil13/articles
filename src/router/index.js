import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/MainPage.vue'),
    children: [
      {
        path: '',
        name: 'articleList',
        component: () => import('../views/articleList/ArticleListPage.vue')
      },
      {
        path: '/article/:id',
        name: 'article',
        component: () => import('../views/article/ArticlePage.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
