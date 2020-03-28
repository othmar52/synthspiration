<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <FilterGroup :filters="deviceFilters" group="device" />
      <FilterGroup :filters="categoryFilters" group="category" />
      <FilterGroup :filters="creatorFilters" group="creator" />
    </div>
    <router-view/>
  </div>
</template>
<script>
import FilterGroup from './components/FilterGroup.vue'

export default {
  name: 'App',
  components: {
    FilterGroup
  },
  
  data: function () {
    return {
      deviceFilters: Object,
      categoryFilters: Object,
      creatorFilters: Object
    }
  },
  
/*
  props: {
    deviceFilters: Object,
    categoryFilters: Object,
    creatorFilters: Object
  },
*/
  mounted() {
    this.setData(bigData)
    //this.deviceFilters = bigData.devices
    //this.categoryFilters = bigData.categories
    //this.creatorFilters = bigData.creators
    // console.log("App.deviceFilters", this.deviceFilters)
    //console.log("App", bigData)
  },

  methods: {
    setData(data) {
      this.deviceFilters = Object.keys(data.devices)
      this.categoryFilters = Object.keys(data.categories)
      this.creatorFilters = Object.keys(data.creators)
    }
  },
}


</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
