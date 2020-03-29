<template>
  <div class="filtergroup__container">
    <div class="single__filter">
    <p>
    <strong>{{group}}</strong>
    <br>
    <button v-on:click="filterDirectionToggle">{{direction}}list</button>
    <button v-on:click="resetFilters">reset</button>
    </p>
    </div>
    <SingleFilter
        v-for="(item,index) in filters"
        v-bind:group="group"
        v-bind:label="item"
        direction="white"
    ></SingleFilter>
  </div>
</template>

<script>
import SingleFilter from './SingleFilter.vue'
export default {
    name: 'FilterGroup',
    components: {
        SingleFilter
    },
    
  data: function () {
    return {
        direction: "white",
        type: this.group
    }
  },

  props: {
    filters: Array,
    group: String
  },
  methods: {
    filterDirectionToggle:function(event) {
      this.direction = this.direction === 'white' ? 'black' : 'white';
      this.$store.dispatch('invertFilter', this)
    },
    resetFilters:function(event) {
      // TODO: should we do a check if child is "SingleFilter"?
      for(let c of this.$children) {
        c.active = false
        this.$store.dispatch('setFilter', c)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.filtergroup__container {
  display: flex;
}
</style>