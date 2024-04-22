
<template>
    <nav>
    <router-link to="/">Active requests</router-link> |
    <router-link to="/addrequest">Add a request</router-link>
  </nav>
    <router-view/>
  
  </template>
  
<script>
    export default {
        name: 'App',
    
    };
</script>
  
<style>
 #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}
nav {
    background-color: rgba(96, 154, 230, 0.25);
    padding: 30px;
}
nav a {
  font-weight: bold;
  color: #000000;
}
nav a.router-link-exact-active {
  color: rgba(166, 194, 230, 0.25);
}

</style>