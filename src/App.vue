<template>
  <Header class="header" v-model:filter="filter" v-model:sort="sort" />
  <Sidebar class="sidebar" />
  <router-view
    class="main"
    v-model:filter="filter"
    v-model:sort="sort"
  ></router-view>
  <Footer class="footer" />
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from "./components/SideBar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Sidebar,
    Footer,
  },
  data() {
    return {
      filter: "",
      sort: "id",
    };
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

  grid-auto-rows: 100px 1fr 100px;
  grid-auto-columns: 1fr 3fr;
  height: 100vh;
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
  border-right: 2px solid teal;
}
.footer {
  grid-area: footer;
}
</style>
