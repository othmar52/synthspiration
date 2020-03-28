<template>
  <div class="filtergroup__container">
    <div class="single__filter">
    <p>
    <strong>{{group}}</strong>
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
    /*
  data: function () {
    return {
    filters: Object,
    group: String
    }
  },
  */

  props: {
    filters: Object,
    group: String
  },
    mounted(){
        console.log("FilterGroup", this.filters)
        //filters = this.filters
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.filtergroup__container {
  display: flex;
}
</style>