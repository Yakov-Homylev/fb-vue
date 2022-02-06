<template>
  <div>
    <nav>
      <ul class="nav__list">
        <li><router-link to="/">All users</router-link></li>
        <li><router-link to="/favorite-users">Favorite users</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav__list {
  list-style: none;
  position: fixed;
}
</style>
