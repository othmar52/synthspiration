<template>
  <div class="hello">
    <h1>Tryout to load data</h1>
    <h2>The challenge</h2>
    <ul>
      <li>having sample data during development</li>
      <li>load all those jsons on demand via file:// protocol</li>
      <li>exclude sample data from webpack</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => ({
  }),
  mounted() {
    console.log("mounted()")
    let path = `@/assets/output/bigData.json`
    try {
      let content = require(path)
      console.log("success", content)
      return content
    } catch (e) {
      console.log("failed to load ")
      return "leider"
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
