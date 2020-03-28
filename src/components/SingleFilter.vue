<template>
  <div class="single__filter">
    <p>label: {{ label}} </p>
  </div>
</template>

<script>
export default {
  name: 'SingleFilter',
  props: {
    group: String,
    label: String,
    direction: String
  },
  computed: {

  },
  methods: {

  },
  watch: {

  },
    mounted(){
        //console.log("SingleFilter", this.label)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.single__filter {
  border: 1px solid black;
  padding: 1em;
}
</style>