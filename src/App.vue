<template>
  <div id="app">
    <FilterSection />
    <div class="content">
      <h1>Synthspiration</h1>
      <Player />
    </div>
    <router-view/>
  </div>
</template>
<script>
import FilterSection from './components/FilterSection.vue'
import Player from './components/Player.vue'
import SampleList from './components/SampleList.vue'
import  { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    FilterSection,
    SampleList,
    Player
  }
}

</script>
<style>
html, body, #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: #1f2935;
  height: calc(100% - 10px);
}

#app {
  display: flex;
}

#app>div:first-child {
  max-width: 50vw;
}

.content {
  flex-grow: 1;
}

h1 {
  text-transform: uppercase;
  color: #36506f;
  font-weight: bold;
  font-size: 3em;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}



button, .btn {
	background-color: #111;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:12px;
	font-weight:bold;
	padding:13px 32px;
	text-decoration:none;
  border: 2px sold black;

}
button:hover, .btn:hover {
	background:linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
	background-color:#408c99;
}
button:active, .btn:active {
	position:relative;
	top:1px;
}

</style>
