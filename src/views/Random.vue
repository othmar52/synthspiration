<template>
  <div class="random">
    <FilterSection />
    <div class="content">
      <h1 class="logo">Synthspiration</h1>
      <RandomButton />
      <Player />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FilterSection from '@/components/FilterSection.vue'
import Player from '@/components/Player.vue'
import RandomButton from '@/components/RandomButton.vue'
import  { mapGetters } from 'vuex'

export default {
  name: 'Random',
  components: {
    FilterSection,
    RandomButton,
    Player
  },
  mounted(){
    if( typeof this.$route.params.sampleId === 'undefined') {
      return
    }
    this.loadSample(this.$route.params.sampleId)
  },
  watch: {
    '$route.params.sampleId': function (sampleId) {
      this.loadSample(sampleId)
    }
  },
  methods: {
    loadSample(sampleId) {
      this.$store.dispatch('triggerLoadSample', sampleId )
    }
  }
}
</script>
<style>
.random {
  display: flex;
  height: calc(100% - 10px);
}

.random>div:first-child {
  max-width: 50vw;
}

.content {
  flex-grow: 1;
}

</style>