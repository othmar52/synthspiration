<template>
    <div>
        <button v-on:click="loadRandomSample">play random sample</button><br>
        {{getCurrentSample.device.vendor }} {{getCurrentSample.device.model }} {{getCurrentSample.displayname }}
        <strong>{{getCurrentSample.patchname}}</strong><br>
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
        devicePrefix: '',
        uniqueIdentifier: '',
        patchname: '',
        displayname: '',
        msb: null,
        lsb: null,
        programchange: null,
        samplepath: '',
        categories: [],
        creator: '',
        duration: 0,
        digitakt: {
          bank: '',
          sbnk: '',
          programchange: ''
        },
        wavPeaks: [],
        device: {
          uniquePrefix: '',
          vendor: '',
          model: '',
          yearOfConstruction: 0,
          patchSetName: '',
          midiChannel: 0
        }
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
      this.$store.dispatch('triggerLoadSample', item)
    }
  }
}

</script>
<style>

</style>
