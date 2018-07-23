// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import {Button, Input, MessageBox} from 'element-ui'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueResource from 'vue-resource';

import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource);
// Vue.component(Button.name, Button)
// Vue.component(Input.name, Input)
// Vue.component(MessageBox.name, MessageBox)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
