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

    <Modal v-model:show="isModalOpen"
      ><UserCard v-bind:user="choosen" v-bind:localUsers="localUsers"
    /></Modal>
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
      localUsers: [],
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
      this.localUsers = [...JSON.parse(isLocalIncludesUser)];
      this.localUsers.map(async (user) => {
        const response = await axios.get(
          `https://api.github.com/users/${user}`
        );
        this.users = [...this.users, response.data];
      });
    }
    this.visibleUsers = [...this.users];
  },
  updated() {
    const localStorageUser = window.localStorage.getItem("users") ?? [];
    const parsedLocalStorage = JSON.parse(localStorageUser);

    this.visibleUsers = [...this.localUsers];
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

    const updatedUsers = filteredAndSortedUsers.filter((user) =>
      parsedLocalStorage.includes(user.login)
    );

    this.visibleUsers = [...updatedUsers];
  },
};
</script>

<style scoped></style>
