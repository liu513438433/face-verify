import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '../components/HelloWorld'
import Login from '../pages/face'
import Verify from '../pages/verify'
import Verify1 from '../pages/verify1'
import Resms from '../pages/resms'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/verify',
      name: 'verify',
      component: Verify
    },
    {
      path: '/verify1',
      name: 'verify1',
      component: Verify1
    },
    {
      path: '/resms',
      name: 'Resms',
      component: Resms
    }
  ]
})
