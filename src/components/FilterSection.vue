<template>
  <div class="filter__section">
    <FilterGroup :filters="deviceFilters" group="devices" />
    <FilterGroup :filters="categoryFilters" group="categories" />
    <FilterGroup :filters="creatorFilters" group="creators" />
  </div>
</template>
<script>
import FilterGroup from './FilterGroup.vue'
import  { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    FilterGroup
  },
  computed: {
      ...mapGetters([
        'getFilterItems'
      ]),
      deviceFilters() {
        return this.getFilterItems('devices')
      },
      categoryFilters() {
        return this.getFilterItems('categories')
      },
      creatorFilters() {
        return this.getFilterItems('creators')
      }
  },
}
</script>
<style>

.filter__section {
    display: flex;
    flex-direction: row;
}
</style>
