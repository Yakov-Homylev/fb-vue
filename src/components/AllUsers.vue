<template>
  <main>
    <section v-if="users.length > 0">
      <UserList>
        <UserItem
          v-on:click="onCardClick"
          v-for="user in visibleUsers"
          v-bind:key="user.id"
          v-bind:user="user"
        />
      </UserList>
    </section>
    <section v-else style="text-align: center">
      <ClearListTitle>Users not found</ClearListTitle>
    </section>
    <Modal v-model:show="isModalOpen"><UserCard v-bind:user="choosen" /></Modal>
  </main>
</template>

<script>
import axios from "axios";
import Modal from "./UI/Modal.vue";
import UserCard from "./UserCard/UserCard.vue";
import UserList from "./UserList/UserList.vue";
import UserItem from "./UserItem/UserItem.vue";
import ClearListTitle from "./UI/ClearListTitle.vue";
export default {
  components: {
    Modal,
    UserCard,
    UserList,
    UserItem,
    ClearListTitle,
  },
  data() {
    return {
      users: [],
      isModalOpen: false,
      choosen: {},
      visibleUsers: [],
    };
  },
  props: {
    filter: {
      type: String,
      default: "",
    },
    sort: {
      type: String,
      default: "id",
    },
  },
  methods: {
    async onCardClick(e) {
      e.preventDefault();
      this.isModalOpen = true;
      const login = e.target.dataset.login;
      const response = await axios.get(`https://api.github.com/users/${login}`);
      this.choosen = { ...response.data };
    },
  },
  async mounted() {
    const response = await axios.get("https://api.github.com/users");
    this.users = response.data;
    this.visibleUsers = [...this.users];
  },
  updated() {
    const filteredAndSortedUsers = this.users
      .filter((user) => user.login.includes(this.filter))
      .sort((userA, userB) => {
        switch (this.sort) {
          case "login":
            return userA.login.localeCompare(userB.login);
          case "id":
            return userA.id - userB.id;

          default:
            userA.id - userB.id;
            break;
        }
      });
    this.visibleUsers = [...filteredAndSortedUsers];
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
