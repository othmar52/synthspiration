<template>
    <a class="btn btn-random" v-on:click="loadRandomSample">random <span class="amount">({{allMatchingSamples.length}})</span></a>
</template>
<script>
import  { mapGetters } from 'vuex'
export default {
  name: 'RandomButton',
  computed: {
    ...mapGetters([
      'getSampleKeys',
      'triggerLoadSample',
      'getCurrentSample',
    ]),
    allMatchingSamples() {
      return this.getSampleKeys
    }
  },
  methods: {
    loadRandomSample(event) {
      let items = this.getSampleKeys
      let item = items[Math.floor(Math.random() * items.length)];
      this.$store.dispatch('triggerLoadSample', item)
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
