<template>
  <main>
    <section v-if="users.length > 0">
      <UserList
        ><UserItem
          v-on:click="onCardClick"
          v-for="user in visibleUsers"
          v-bind:key="user.id"
          v-bind:user="user"
      /></UserList>
    </section>
    <section v-else>
      <ClearListTitle>You not choose users</ClearListTitle>
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
      localUser: [],
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
  mounted() {
    const isLocalIncludesUser = window.localStorage.getItem("users");
    if (isLocalIncludesUser) {
      this.localUser = [...JSON.parse(isLocalIncludesUser)];
      this.localUser.map(async (user) => {
        const response = await axios.get(
          `https://api.github.com/users/${user}`
        );
        this.users = [...this.users, response.data];
      });
    }
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

<style scoped></style>
