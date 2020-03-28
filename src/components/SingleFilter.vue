<template>
  <button class="single__filter" v-on:click="filterClick">L:{{ label}}<br/>d:{{direction}}<br/>a:{{active}}</button>
</template>

<script>
export default {
  name: 'SingleFilter',

  data: function () {
    return {
      direction: "white",
      active: false
    }
  },
  props: {
    group: String,
    label: String
  },
  computed: {

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
</style>