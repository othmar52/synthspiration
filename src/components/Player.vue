<template>
    <div>
        <h2>player: <span v-on:click="loadRandomSample">random</span></h2>
<audio :src="getCurrentSample.samplepath" autoplay controls>
  Your browser does not support the <code>audio</code> element.
</audio>
    </div>
</template>
<script>
import  { mapGetters } from 'vuex'
export default {
  name: 'Player',
  data: function(){
      return {
          currentSample: {
              samplepath: ''
          }
      }
  },
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
        //this.triggerLoadSample(item)
        this.$store.dispatch('triggerLoadSample', item)

        console.log(item)

      //this.deviceFilters = Object.keys(data.devices)
      //this.categoryFilters = Object.keys(data.categories)
      //this.creatorFilters = Object.keys(data.creators)
    }
  }
}

</script>
<style>

</style>
