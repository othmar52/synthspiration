<template>
    <div>
        <h2>samples: {{allMatchingSamples.length}}</h2>
        <span v-for="(sampleKey,idx) in allMatchingSamples" :key="`${idx}`">{{sampleKey}}</span>
    </div>
</template>
<script>
import  { mapGetters } from 'vuex'
export default {
  name: 'SampleList',
  computed: {
      ...mapGetters([
        'getSampleKeys'
      ]),
      allMatchingSamples() {
        return this.getSampleKeys
      }
  }
}

</script>
<style>

</style>
