<template>
  <button :class="`single__filter single__filter-${stateClass}`" v-on:click="filterClick">
    {{label}} ({{currentResults}})
  </button>
</template>

<script>
import  { mapGetters } from 'vuex'
export default {
  name: 'SingleFilter',

  data: function () {
    return {
      active: false
    }
  },
  props: {
    group: String,
    label: String
  },
  computed: {
    ...mapGetters([
      'getAmountForFilter'
    ]),
    stateClass() {
      return (this.active === true) ? 'active' : '';
    },
    currentResults() {
      return this.getAmountForFilter(this.group, this.label)
    }
  },
  methods: {
    filterClick:function(event) {
      this.active = this.active ? false : true;
      this.$store.dispatch('setFilter', this)
    }
  },
  watch: {

  },
    mounted(){
        //console.log("SingleFilter", this.label)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.single__filter {
  border: 1px solid black;
  padding: 1em;
}

.single__filter-active {
  background-color: #333;
  color: #BBB;
}
</style>