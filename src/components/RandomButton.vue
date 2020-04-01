<template>
    <router-link
      :to="`/sample/${getNextSampleKey}`"
      class="btn btn-random"
      :title="`next:${getNextSampleKey }`">
        random <span class="amount">({{allMatchingSamples.length}})</span>
    </router-link>
</template>
<script>
import  { mapGetters } from 'vuex'
export default {
  name: 'RandomButton',
  computed: {
    ...mapGetters([
      'getSampleKeys',
      'getNextSampleKey'
    ]),
    allMatchingSamples() {
      return this.getSampleKeys
    }
  },
  methods: {
    loadRandomSample() {
      this.$store.dispatch(
        'triggerLoadSample',
        this.getNextSampleKey
      )
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
