import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'auth'}
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/auth.vue'),
    redirect: {name: 'login'},
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../components/auth/login.vue')
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('../components/auth/signup.vue')
      }
    ]
  },
  {
    path: '/index/:id',
    name: 'index',
    component: () => import('../views/index.vue'),
    redirect: {name: 'home'},
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home.vue')
      },
      {
        path: 'post/:postId',
        name: 'openPost',
        component: () => import('../components/post/openPost.vue')
      },
      {
        path: 'create-post',
        name: 'createPost',
        component: () => import('../components/post/createPost.vue')
      },
      {
        path: 'my-space',
        name: 'myPage',
        component: () => import('../views/mySpace.vue')
      },
      {
        path: 'my-profil',
        name: 'myProfil',
        component: () => import('../views/myProfil.vue')
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('../views/admin/admin.vue'),
        redirect: {name: 'listAdmin'},
        children: [
          {
            path: 'list-Admin',
            name: 'listAdmin',
            component: () => import('../views/admin/listAdmin.vue')
          },
          {
            path: 'list-User',
            name: 'listUser',
            component: () => import('../views/admin/listUser.vue')
          },
        ]
      },
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  base: "/gropomania/",
  routes: routes
})

export default router
