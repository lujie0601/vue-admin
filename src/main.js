import Vue from "vue";
import VueCompositionApi from "@vue/composition-api"
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store";
import './icons' //引入全局组件

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCompositionApi)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
