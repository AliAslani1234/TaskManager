import { createRouter, createWebHistory } from 'vue-router';
import store from "../store/main";


const routes = [
  {
    path: '/',
    name: 'Auth',
    component: () => import("../Layouts/AuthLayout.vue"),
    children: [
      {
        path: 'authentication/login',
        name: 'Login',
        component: () => import("../views/Authentication/Login.vue")
      },
      {
        path: 'authentication/Signup',
        name: 'Signup',
        component: () => import("../views/Authentication/Signup.vue")
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import("../Layouts/MainLayout.vue"),
    children: [
      {
        name: 'Home',
        path: '/home',
        meta: { requiresAuth: "true" , access : "true" }, 
        component: () => import("../views/Home.vue")
      },
      {
        name: 'User',
        path: '/user/:id',
        props: true,
        meta: { requiresAuth: "true"  }, 
        component: () => import("../views/UserPage.vue")
      },
      {
        name: 'Task',
        path: '/Task/:userId/:taskId',
        props: true,
        meta: { requiresAuth: "true" }, 
        component: () => import("../views/TaskPage.vue")
      },
    ]
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('../views/Errors/Error403.vue'),
  },  
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/Errors/Error404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth) {

    if (store.state.tokenId) {

      if (to.meta.access && store.state.userRole !== 'admin') {

        next({ name: 'Forbidden' });

      } else {

        next();
      }
    } else {

      next({ name: 'Login' });
    }
  } else {
    next();
  }
});






export default router;
