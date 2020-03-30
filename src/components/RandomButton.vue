<template>
<div>
    <router-link :to="`/sample/${getNextSampleKey}`">next: {{ getNextSampleKey }}</router-link>
    <a class="btn btn-random" v-on:click="loadRandomSample">random <span class="amount">({{allMatchingSamples.length}})</span></a>
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
