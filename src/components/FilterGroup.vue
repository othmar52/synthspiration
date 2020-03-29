<template>
  <div class="filtergroup__container">
    <div class="filter__header">
      <strong>{{group}}</strong>
      <a :class="`icon icon-invert filter__state-${direction}`" v-on:click="filterDirectionToggle" title="invert (blacklist/whitelist)"></a>
      <a class="icon icon-reset" v-on:click="resetFilters" title="resrt filters"></a>
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
  flex-wrap: wrap;
  padding: 10px;
  justify-content: center;
}

.filter__header {
  width: 100%;
  height: 2em;
  flex-shrink: 0;
  background-color: #0b1130;
  display: flex;
  padding: 3px;
}

.filter__header strong{
  flex-grow: 1;
}

.icon {
  margin-left: 5px;
  width: 30px;
  flex-grow: 0;
  background-color: #0b1130;
  background-size: 30px;
}

.icon-invert {
  /* thanks to https://www.iconfinder.com/icons/326660/colors_invert_icon */
  background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxOHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxOCAxOCIgd2lkdGg9IjE4cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjkuMDAwMDAwLCAtMjk3LjAwMDAwMCkiPjxnIGlkPSJpbnZlcnQtY29sb3JzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjkuMDAwMDAwLCAyOTcuMDAwMDAwKSI+PHBhdGggZD0iTTE0LDkgQzE0LDYuMiAxMS44LDQgOSw0IEw5LDE0IEMxMS44LDE0IDE0LDExLjggMTQsOSBMMTQsOSBaIE0xNiwwIEwyLDAgQzAuOSwwIDAsMC45IDAsMiBMMCwxNiBDMCwxNy4xIDAuOSwxOCAyLDE4IEwxNiwxOCBDMTcuMSwxOCAxOCwxNy4xIDE4LDE2IEwxOCwyIEMxOCwwLjkgMTcuMSwwIDE2LDAgTDE2LDAgWiBNMTYsMTYgTDksMTYgTDksMTQgQzYuMiwxNCA0LDExLjggNCw5IEM0LDYuMiA2LjIsNCA5LDQgTDksMiBMMTYsMiBMMTYsMTYgTDE2LDE2IFoiIGlkPSJTaGFwZSIvPjwvZz48L2c+PC9nPjwvc3ZnPg==);
  
}

.icon-reset {
  /* thanks to https://www.iconfinder.com/icons/103181/close_cross_delete_remove_icon */
  background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yMi4yNDUsNC4wMTVjMC4zMTMsMC4zMTMsMC4zMTMsMC44MjYsMCwxLjEzOWwtNi4yNzYsNi4yN2MtMC4zMTMsMC4zMTItMC4zMTMsMC44MjYsMCwxLjE0bDYuMjczLDYuMjcyICBjMC4zMTMsMC4zMTMsMC4zMTMsMC44MjYsMCwxLjE0bC0yLjI4NSwyLjI3N2MtMC4zMTQsMC4zMTItMC44MjgsMC4zMTItMS4xNDIsMGwtNi4yNzEtNi4yNzFjLTAuMzEzLTAuMzEzLTAuODI4LTAuMzEzLTEuMTQxLDAgIGwtNi4yNzYsNi4yNjdjLTAuMzEzLDAuMzEzLTAuODI4LDAuMzEzLTEuMTQxLDBsLTIuMjgyLTIuMjhjLTAuMzEzLTAuMzEzLTAuMzEzLTAuODI2LDAtMS4xNGw2LjI3OC02LjI2OSAgYzAuMzEzLTAuMzEyLDAuMzEzLTAuODI2LDAtMS4xNEwxLjcwOSw1LjE0N2MtMC4zMTQtMC4zMTMtMC4zMTQtMC44MjcsMC0xLjE0bDIuMjg0LTIuMjc4QzQuMzA4LDEuNDE3LDQuODIxLDEuNDE3LDUuMTM1LDEuNzMgIEwxMS40MDUsOGMwLjMxNCwwLjMxNCwwLjgyOCwwLjMxNCwxLjE0MSwwLjAwMWw2LjI3Ni02LjI2N2MwLjMxMi0wLjMxMiwwLjgyNi0wLjMxMiwxLjE0MSwwTDIyLjI0NSw0LjAxNXoiLz48L3N2Zz4=);
}

.filter__state-black {
  background-color: white;
}

</style>