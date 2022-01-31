<template>
  <Header class="header" />
  <Sidebar class="sidebar" />
  <AllUsers class="main" />
  <Footer class="footer" />
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from "./components/SideBar.vue";
import AllUsers from "./components/AllUsers.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    AllUsers,
    Sidebar,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  height: 100vh;
  widows: 100vw;
  margin: 0 auto;
}
.header {
  grid-area: header;
  border-bottom: 2px solid teal;
  padding: 12px;
}
.main {
  grid-area: main;
  padding: 8px;
}
.sidebar {
  grid-area: sidebar;
}
.footer {
  grid-area: footer;
}
</style>
