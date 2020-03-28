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
  data() {
    return {
      isRed: true
    }
  },

mounted() {
    console.log(bigData)
    //let recaptchaScript = document.createElement('script')
    //recaptchaScript.setAttribute('src', './output/bigData.json')
    //document.head.appendChild(recaptchaScript)
    //console.log(window.hansi)

/*
    return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.onload = () => {
      resolve(import(someComponent))
    }
    script.async = true
    script.src = './output/bigData.json'
    document.head.appendChild(script)
    })
*/


    //console.log(hansi)

    /*
    try {
      let name = 'bigData.json';
      let content = require(`../../public/output/${name}`);
      console.log(content); // eslint-disable-line no-console
      return content
    } catch (e) {
      return "leider"
    }
    */
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

.is-red {
  color: red;
}
</style>
