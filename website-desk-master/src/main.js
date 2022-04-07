import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import 'element-ui/lib/theme-chalk/index.css'
import router from "./router";
import store from "./store";
import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
