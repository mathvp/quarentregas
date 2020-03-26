
const routes = [
  {
    path: '/',
    component: () => import('layouts/NewLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'categorias/listar/:id',
        name: 'categoryListing',
        component: () => import('pages/CategoryListing.vue')
      }
    ]
  },
  {
    path: '/anunciar',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'add',
        component: () => import('pages/Add.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
