import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from "../views/Home.vue"
import Brands from "../views/Brands/Brands.vue"
import LoginPage from "../views/Auth/Login.vue"
import AddNewBrand from "../views/Brands/addBrand.vue"

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      name: 'home',
      component: HomeView,
      children: [{
          path: '/brands',
          name: 'brands',
          component: Brands
        },
        {
          path: '/add',
          name: 'AddNewBrand',
          component: AddNewBrand
        },
      ],

    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,

    }

  ]
})

export default router