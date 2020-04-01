import Vue from 'vue'
import App from './App.vue'
//import VueRx from 'vue-rx'
import router from './router'
import store from './store'

Vue.config.productionTip = false
//Vue.use(VueRx)


// due to the requirement of supporting file:// protocol we can't
// perform an ajax call. but we can load a script during runtime by creating a DOM node...
let bigDataNode = document.createElement('script')
bigDataNode.setAttribute('src', './output/bigData.json')
document.head.appendChild(bigDataNode)

window.initialDataLoadInterval = window.setInterval(
  function(){
    if(typeof bigData === "undefined") {
      // continue loop until we get bigData from external file...
      return
    }
    // now we ar ready to go
    // destroy the interval and init Vue app
    clearInterval(window.initialDataLoadInterval)
    bigDataNode.parentNode.removeChild(bigDataNode);
    store.dispatch('setBigData', bigData) // eslint-disable-line no-undef

    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
    return
  },
  5
);

