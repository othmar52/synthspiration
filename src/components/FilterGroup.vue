<template>
  <div class="filtergroup__container">
    <div class="filter__header">
      <strong>
      <span v-if="direction === 'black'">NOT</span> {{group}}</strong>
      <a :class="`icon icon-invert filter__state-${direction}`" v-on:click="filterDirectionToggle" title="invert (blacklist/whitelist)">
        <IconInvert />
      </a>
      <a class="icon icon-reset" v-on:click="resetFilters" title="resrt filters">
        <IconReset />
      </a>
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
import IconInvert from './IconInvert.vue'
import IconReset from './IconReset.vue'
export default {
    name: 'FilterGroup',
    components: {
        SingleFilter,
        IconInvert,
        IconReset
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
        if( typeof c.active !== "undefined") {
          c.active = false
          this.$store.dispatch('setFilter', c)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.filtergroup__container {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: center;
}

.filter__header {
  width: 100%;
  height: 30px;
  flex-shrink: 0;
  background-color: #0a1a2d;
  display: flex;
  margin: 3px;
  padding-top: 7px;
}

.filter__header strong{
  flex-grow: 1;
}

.icon {
  margin: 1px 5px;
  width: 20px;
  flex-grow: 0;
  background-size: 20px;
  fill: #36506f;
}

.icon-invert {
  /* thanks to https://www.iconfinder.com/icons/326660/colors_invert_icon */
  
}

.icon-reset svg {
  /* thanks to https://www.iconfinder.com/icons/103181/close_cross_delete_remove_icon */
}

.filter__state-black {
  fill: #AAA;
}

</style>