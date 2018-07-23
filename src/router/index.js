import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '../components/HelloWorld'
import Login from '../pages/face'
import Statement from '../pages/statement'
import Tips from '../pages/tips'
import Verify from '../pages/verify'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/statement',
      name: 'statement',
      component: Statement
    },
    {
      path: '/tips',
      name: 'tips',
      component: Tips
    },
    {
      path: '/verify',
      name: 'verify',
      component: Verify
    }
  ]
})
