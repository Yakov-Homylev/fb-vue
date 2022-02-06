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
      v-bind:disabled="inFavorite"
      >Add to Choosen Users</SubmitButton
    >
    <SubmitButton v-on:click="deleteFromChoosen" v-bind:data-login="user.login"
      >Delete from Choosen Users</SubmitButton
    >
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import SubmitButton from "../UI/SubmitButton.vue";
export default {
  components: {
    SubmitButton,
  },
  props: {
    user: { type: Object, default: () => ({}) },
    localUsers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      inFavorite: false,
    };
  },
  methods: {
    addToChoosen(e) {
      const toast = useToast();
      const newUser = e.target.dataset.login;
      const localStorage = window.localStorage.getItem("users");
      const parsedLocalStorage = JSON.parse(localStorage) ?? [];
      const isUserIncludsInArray = parsedLocalStorage.includes(newUser);
      if (isUserIncludsInArray) {
        return toast.error("This user in your choosen");
      }
      this.$emit("update:localUsers", [...parsedLocalStorage, newUser]);

      window.localStorage.setItem(
        "users",
        JSON.stringify([...parsedLocalStorage, newUser])
      );
      toast.success("User add to your list");
    },
    deleteFromChoosen(e) {
      const toast = useToast();
      const newUser = e.target.dataset.login;
      const localStorageUser = window.localStorage.getItem("users");
      const parsedLocalStorage = JSON.parse(localStorageUser) ?? [];
      const notIncludeUser = parsedLocalStorage.find(
        (user) => user === newUser
      );

      if (!notIncludeUser) {
        return toast.error("This user not in your choosen");
      }
      const newLocalStorage = parsedLocalStorage.filter(
        (user) => user !== newUser
      );
      window.localStorage.setItem("users", JSON.stringify(newLocalStorage));
      this.$emit("update:localUsers", [...newLocalStorage]);

      toast.success("User delete from your list");
    },
  },
  mounted() {
    const isLocalIncludesUser = window.localStorage.getItem("users");
    if (isLocalIncludesUser) {
      // this.localUsers = [...JSON.parse(isLocalIncludesUser)];
      this.$emit("update:localUsers", [...JSON.parse(isLocalIncludesUser)]);
    }
    if (!isLocalIncludesUser) {
      return;
    }
    this.inFavorite = JSON.parse(isLocalIncludesUser).find(
      (login) => login === this.user.login
    );
  },
  unmounted() {
    this.inFavorite = false;
    this.$emit("update:user", {});
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
