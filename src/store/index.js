import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


function intersection() {
  var result = [];
  var lists;

  if (arguments.length === 1) {
      lists = arguments[0];
  } else {
      lists = arguments;
  }

  for (var i = 0; i < lists.length; i++) {
      var currentList = lists[i];
      for (var y = 0; y < currentList.length; y++) {
          var currentValue = currentList[y];
          if (result.indexOf(currentValue) !== -1) {
              continue;
          }
          if (lists.filter(function (obj) { return obj.indexOf(currentValue) == -1 }).length == 0) {
              result.push(currentValue);
          }
      }
  }
  return result;
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
      },
      creators: {
        direction: "white",
        active: []
      }
    }
  },
  mutations: {
  },
  actions: {
    setBigData: function(context, bigData) {
      this.state.bigData = bigData
    },
    setFilter: function(context, filter) {
      //console.log(filter.active, filter.group, filter.label)
      if(filter.active) {
        this.state.activeFilters[filter.group].active.push(filter.label)
        return
      }
      let index = this.state.activeFilters[filter.group].active.indexOf(filter.label);
      if (index !== -1) this.state.activeFilters[filter.group].active.splice(index, 1);
    },
    invertFilter: function(context, filter) {
      //console.log(filter.direction, filter.group, filter.label)
      this.state.activeFilters[filter.group].direction = filter.direction
      return
    }
  },
  modules: {

  },
  getters: {
    getActiveFilters: state => {
      return state.activeFilters
    },
    getFilterItems: (state) => (typeArg) => {
      //console.log("typeArg", typeArg)
      //console.log(Object.keys(state.bigData[typeArg]))
      return Object.keys(state.bigData[typeArg])
    },
    getSampleKeys: state => {
      let totalActiveFilters = state.activeFilters.devices.active.length
      totalActiveFilters += state.activeFilters.categories.active.length
      totalActiveFilters += state.activeFilters.creators.active.length
      if(totalActiveFilters === 0) {
        // no filter set - return all
        return Object.keys(state.bigData.jsonPaths)
      }

      let resultLists = []
      //console.log("aaa", state.bigData)

      //var idx = 0;
      for(let subject of ["devices", "categories", "creators"]) {
          let filter = state.activeFilters[subject]
          //console.log("f", filter)
          if (filter.active.length === 0) {
            continue
          }
          let singleFilterList = []
          for (let singleValue of filter.active) {
            let list = state.bigData[subject][singleValue];
            if (filter.direction === "black") {
              resultLists.push(list[filter.direction]);
                continue;
            }
            singleFilterList = singleFilterList.concat(list[filter.direction]);
          }
          if (filter.direction === "white") {
            resultLists.push(singleFilterList);
          }

      }

      return intersection(resultLists);


      //console.log("getSampleKeys", state.activeFilters)
      //console.log(intersection(["bla"]) )
      //return Object.keys(state.bigData.jsonPaths)
    }
  }
})
