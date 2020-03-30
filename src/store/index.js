import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


/**
 * calculates intersection of two or more arrays
 */
function intersection() {
  let result = [];
  let lists = (arguments.length === 1) ? arguments[0] : arguments;

  for (let i = 0; i < lists.length; i++) {
    let currentList = lists[i];
    for (let y = 0; y < currentList.length; y++) {
      let currentValue = currentList[y];
      if (result.indexOf(currentValue) !== -1) {
        continue;
      }
      if (lists.filter(function (obj) { return obj.indexOf(currentValue) == -1 }).length == 0) {
        result.push(currentValue);
      }
    }
  }
  return shuffle(result);
}

/**
 * Shuffles array in place. ES6 version
 * thanks to https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 *
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


export default new Vuex.Store({
  state: {
    bigData: {},
    activeFilters: {
      devices: {
        direction: "white",
        active: []
      },
      categories: {
        direction: "white",
        active: []
      }
    },
    resultList: [],
    currentSample: {
      device: {},
      categories: []
    }
  },
  mutations: {
  },
  actions: {
    setBigData: function (context, bigData) {
      this.state.bigData = bigData
      context.dispatch('calculateResults')
    },
    setFilter: function (context, filter) {
      if (filter.active) {
        this.state.activeFilters[filter.group].active.push(filter.label)
        context.dispatch('calculateResults')
        return
      }
      let index = this.state.activeFilters[filter.group].active.indexOf(filter.label)
      if (index !== -1)
        this.state.activeFilters[filter.group].active.splice(index, 1)
      context.dispatch('calculateResults')
    },
    invertFilter: function (context, filter) {
      this.state.activeFilters[filter.group].direction = filter.direction
      context.dispatch('calculateResults')
      return
    },
    triggerLoadSample: function (context, sampleKey) {

      let that = this
      let scriptNode = document.createElement('script')
      scriptNode.setAttribute('src', this.state.bigData.jsonPaths[sampleKey])
      document.head.appendChild(scriptNode)

      window.sampleDataLoadInterval = window.setInterval(
        function(){
          if(typeof window.sampleData === "undefined") {
            // continue loop until we get bigData from external file...
            return
          }
          that.state.currentSample = window.sampleData
          that.state.currentSample.device = that.state.bigData.devicConf[ window.sampleData. devicePrefix ]
          window.sampleData = undefined
          
          // now we ar ready to go
          // destroy the interval and init Vue app
          clearInterval(window.sampleDataLoadInterval)
          scriptNode.parentNode.removeChild(scriptNode);
        },
        5
      );
    },
    calculateResults: function (context) {
      let totalActiveFilters = context.state.activeFilters.devices.active.length
      totalActiveFilters += context.state.activeFilters.categories.active.length
      if (totalActiveFilters === 0) {
        // no filter set - return all
        context.state.resultList = Object.keys(context.state.bigData.jsonPaths)
        return
      }

      let resultLists = []

      for (let subject of ["devices", "categories"]) {
        let filter = context.state.activeFilters[subject]
        if (filter.active.length === 0) {
          continue
        }
        let singleFilterList = []
        for (let singleValue of filter.active) {
          let list = context.state.bigData[subject][singleValue];
          if (filter.direction === "black") {
            resultLists.push(list[filter.direction]);
            continue;
          }
          // within the same subject concat lists to achieve an "OR"-condition when calling intersect()
          singleFilterList = singleFilterList.concat(list[filter.direction]);
        }
        if (filter.direction === "white") {
          resultLists.push(singleFilterList);
        }
      }
      context.state.resultList = intersection(resultLists)
    }
  },
  modules: {

  },
  getters: {
    getActiveFilters: state => {
      return state.activeFilters
    },
    getFilterItems: (state) => (typeArg) => {
      return Object.keys(state.bigData[typeArg])
    },
    getAmountForFilter: (state) => (typeArg, valueArg) => {
      let amount = 0
      for (let k of state.resultList) {
        if (state.bigData[typeArg][valueArg].all[k] === state.activeFilters[typeArg].direction) {
          amount++
        }
      }
      return amount
    },
    getSampleKeys: state => {
      return state.resultList
    },
    getCurrentSample: state => {
      return state.currentSample
    },
    getLabelForFilter: (state) => (typeArg, valueArg) => {
      if( typeArg !== 'devices' ) {
        return valueArg
      }
      return state.bigData['devicConf'][valueArg].model
    }
  }
})
