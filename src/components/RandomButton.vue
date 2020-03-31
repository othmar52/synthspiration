<template>
<div>
    <router-link :to="`/sample/${getNextSampleKey}`" class="btn btn-random" :title="`next:${getNextSampleKey }`">
    random <span class="amount">({{allMatchingSamples.length}})</span>
    </router-link>
  </div>
</template>
<script>
import  { mapGetters } from 'vuex'
export default {
  name: 'RandomButton',
  computed: {
    ...mapGetters([
      'getSampleKeys',
      'getNextSampleKey',
      'triggerLoadSample',
      'getCurrentSample',
    ]),
    allMatchingSamples() {
      return this.getSampleKeys
    }
  },
  methods: {
    loadRandomSample(event) {
      this.$store.dispatch('triggerLoadSample', this.$store.getters.getNextSampleKey)
    }
  }
}

</script>
<style>
.btn.btn-random{
    font-size: 2em;
    color: white;
    text-transform: uppercase;
    margin: 20px 50px;
    display: block;
}

</style>
