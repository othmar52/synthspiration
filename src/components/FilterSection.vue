<template>
  <div class="filter__section">
    <FilterGroup :filters="deviceFilters" group="devices" />
    <FilterGroup :filters="categoryFilters" group="categories" />
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
