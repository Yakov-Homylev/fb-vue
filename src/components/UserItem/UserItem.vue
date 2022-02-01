<template>
  <li class="user__item">
    <a class="user__link" v-bind:data-login="user.login">
      <h2 class="user__login">{{ user.login }}</h2>
      <img class="user__avatar" :src="user.avatar_url" :alt="user.login"
    /></a>
  </li>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },
};
</script>

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
  cursor: pointer;
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
