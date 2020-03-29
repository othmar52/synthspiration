<template>
  <a :class="`btn single__filter single__filter-${stateClass}`" v-on:click="filterClick">
    <nobr>{{filterLabel}} <span class="amount">({{currentResults}})</span></nobr>
  </a>
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
      'getAmountForFilter',
      'getLabelForFilter'
    ]),
    stateClass() {
      return (this.active === true) ? 'active' : '';
    },
    currentResults() {
      return this.getAmountForFilter(this.group, this.label)
    },
    filterLabel: function() {
      return this.getLabelForFilter(this.group, this.label)
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
  padding: 1em;
  flex-basis: 80px;
  flex-grow: 1;
  margin: 3px;
}

.btn.single__filter-active {
  background-color: #333;
  color: #BBB;
}
</style>