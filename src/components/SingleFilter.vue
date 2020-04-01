<template>
  <a :class="`btn single__filter single__filter-${stateClass} single__filter-${currentResults} color-${filterColor}`"
  v-on:click="filterClick">
    <span>
    {{filterLabel}}<span class="amount">({{currentResults}})</span>
    </span>
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
      'getLabelForFilter',
      'getColorForFilter'
    ]),
    stateClass() {
      return (this.active === true) ? 'active' : '';
    },
    currentResults() {
      return this.getAmountForFilter(this.group, this.label)
    },
    filterLabel() {
      return this.getLabelForFilter(this.group, this.label)
    },
    filterColor() {
      return this.getColorForFilter(this.group, this.label)
    }
  },
  methods: {
    filterClick: function() {
      this.active = this.active ? false : true;
      this.$store.dispatch('setFilter', this)
    }

  }
}
</script>

<style>
.single__filter {
  padding: 1em;
  flex-basis: 80px;
  flex-grow: 1;
  margin: 3px;
  font-size: 0.9em;
}

.btn.single__filter-active {
  background-color: #333;
  color: #BBB;
}

.single__filter-0 {
  opacity: 0.3;
}

.single__filter>span {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.single__filer .amount {
  display: inline-block;
  padding-left: 0.4em;
}

.single__filter {
  border-bottom: 2px solid #07101b;
  
}

/* @see https://www.donaufischer.com/java/farbnamen.htm */
.color-lawngreen     { border-color: #7CFC00; }
.color-darkgoldenrod { border-color: #B8860B; }
.color-grey          { border-color: #808080; }
.color-teal          { border-color: #008080; }
.color-firebrick     { border-color: #B22222; }
.color-darkorange    { border-color: #FF8C00; }
.color-darkblue      { border-color: #00008B; }
.color-dodgerblue    { border-color: #1E90FF; }

</style>