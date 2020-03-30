<template>
  <div id="app">
    <FilterSection />
    <div class="content">
      <h1 class="logo">Synthspiration</h1>
      <RandomButton />
      <Player />
    </div>
    <router-view/>
  </div>
</template>
<script>
import FilterSection from './components/FilterSection.vue'
import Player from './components/Player.vue'
import SampleList from './components/SampleList.vue'
import RandomButton from './components/RandomButton.vue'
import  { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    FilterSection,
    SampleList,
    RandomButton,
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
  background-color: #03030a;
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
  color: #36506f;
  font-weight: bold;
  font-size: 3em;
}
h1.logo {
  color: #07101b;
  text-transform: uppercase;
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
	background-color: #07101b;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:12px;
	font-weight:bold;
	padding:13px 32px;
	text-decoration:none;
}
button:hover, .btn:hover {
	background-color:#0a1a2d;
}
button:active, .btn:active {
	position:relative;
	top:1px;
}

.amount {
  color: #555;
}

</style>
