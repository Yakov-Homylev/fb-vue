<template>
  <main>
    <section v-if="users.length > 0">
      <ul class="user__list">
        <li class="user__item" v-for="user in users" v-bind:key="user.id">
          <a class="user__link" v-on:click="onCardClick" v-bind:data="user.id">
            <h2 class="user__login">{{ user.login }}</h2>
            <img class="user__avatar" :src="user.avatar_url"
          /></a>
        </li>
      </ul>
    </section>
    <section v-else>
      <h2>Users not found</h2>
    </section>
    <Modal v-model:show="isModalOpen"></Modal>
  </main>
</template>

<script>
import axios from "axios";
import Modal from "./Modal.vue";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      users: [],
      isModalOpen: false,
      choosen: {},
    };
  },
  methods: {
    onCardClick(e) {
      this.isModalOpen = true;
      console.log(e);
    },
  },
  async mounted() {
    const response = await axios.get("https://api.github.com/users");
    this.users = response.data;
    console.log(this.users);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user__list {
  list-style: none;
  padding: 0;
}
.user__item {
  border: 1px solid teal;
  border-radius: 8px;
}
.user__item:not(:last-child) {
  margin-bottom: 12px;
}
.user__link {
  color: currentColor;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}
.user__login {
  font-weight: 500;
}
.user__avatar {
  display: block;
  width: 100px;
  border-radius: 50%;
}
</style>
