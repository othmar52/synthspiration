<template>
  <div id="app">
      <!--div id="nav">
        <router-link to="/">Random</router-link> |
        <router-link to="/patchlist">patchlist</router-link>
      </div-->
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App'
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
  height: 100%;
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
