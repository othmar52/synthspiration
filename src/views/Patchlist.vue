<template>
  <div class="patchlist">
    <h1>TODO: patchlist page</h1>
    <p>
      filter for devices<br>
      list to all patches
    </p>


    <SampleList />
  </div>
</template>
<script>
import SampleList from '@/components/SampleList.vue'
export default {
  name: 'Patchlist',
  components: {
    SampleList
  }
}
</script>
