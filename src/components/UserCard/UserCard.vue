<template>
  <div class="user-card__wrapper">
    <div>
      <h2 class="user-card_login">{{ user.login }}</h2>
      <img :src="user.avatar_url" :alt="user.login" class="user-card__image" />
    </div>
    <ul class="user-card__list">
      <li>
        <a class="user-card__link" :href="user.followers_url"
          ><span>Followers</span>
          <p>{{ user.followers }}</p></a
        >
      </li>
      <li>
        <a class="user-card__link" :href="user.following_url"
          ><span>Following</span>
          <p>{{ user.following }}</p>
        </a>
      </li>
      <li>
        <a class="user-card__link" :href="user.repos_url"
          ><span>Repositories</span>
          <p>{{ user.public_repos }}</p></a
        >
      </li>
    </ul>
    <SubmitButton
      style="margin-bottom: 8px"
      v-on:click="addToChoosen"
      v-bind:data-login="user.login"
      >Add to Choosen Users</SubmitButton
    >
    <SubmitButton v-on:click="deleteFromChoosen" v-bind:data-login="user.login"
      >Delete from Choosen Users</SubmitButton
    >
  </div>
</template>

<script>
import SubmitButton from "../UI/SubmitButton.vue";
export default {
  components: {
    SubmitButton,
  },
  props: {
    user: Object,
  },
  data() {
    return {
      localUser: [],
    };
  },
  methods: {
    addToChoosen(e) {
      console.log(e.target.dataset.login);
      const newUser = e.target.dataset.login;
      const isUserIncludsInArray = this.localUser.includes(newUser);
      if (isUserIncludsInArray) {
        return alert("This user in your choosen");
      }
      this.localUser = [...this.localUser, newUser];

      window.localStorage.setItem("users", JSON.stringify(this.localUser));
    },
    deleteFromChoosen(e) {
      const newUser = e.target.dataset.login;
      const localStorageUser = window.localStorage.getItem("users");
      console.log(localStorageUser);
      if (!localStorageUser) {
        return alert("This user not in your choosen");
      }
      const newLocalStorage = JSON.parse(localStorageUser).filter(
        (user) => user !== newUser
      );
      console.log(newLocalStorage);
      window.localStorage.setItem("users", JSON.stringify(newLocalStorage));
      this.localUser = [...newLocalStorage];
    },
  },
  mounted() {
    const isLocalIncludesUser = window.localStorage.getItem("users");
    if (isLocalIncludesUser) {
      this.localUser = [...JSON.parse(isLocalIncludesUser)];
    }
  },
};
</script>

<style scoped>
.user-card__wrapper {
  display: flex;
  flex-direction: column;
}
.user-card_login {
  text-align: center;
}
.user-card__image {
  display: block;
  width: 200px;
  border-radius: 50%;
}
.user-card__list {
  display: flex;
  flex-direction: column;
  text-align: center;
  list-style: none;
  padding: 0;
}
.user-card__link {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  text-decoration: none;
  color: currentColor;
}
</style>
