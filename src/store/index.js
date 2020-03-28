import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bigData: {},
    activeFilters: []
  },
  mutations: {
  },
  actions: {
    setBigData: function(context, bigData) {
      this.state.bigData = bigData
    },
    setFilter: function(context, filter) {
      console.log(filter.active)
      console.log(filter.group)
      console.log(filter.label)
      this.state.activeFilters.push(filter)
    }
  },
  modules: {

  },
  getters: {
    getActiveFilters: state => {
      return state.activeFilters;
    },
    getFilterItems: (state) => (typeArg) => {
      //console.log("typeArg", typeArg)
      //console.log(Object.keys(state.bigData[typeArg]))
      return Object.keys(state.bigData[typeArg])
    },
    getSampleKeys: (state) => {
      return ["disko1", "disko2"]
    }
  }
})
