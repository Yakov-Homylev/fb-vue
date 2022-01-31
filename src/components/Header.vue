<template>
  <header>
    <div class="header__wrapper">
      <input class="input" type="text" />
      <select class="select" name="sort">
        <option disabled value="Choose sort">Choose sort</option>
        <option value="By name">By name</option>
        <option value="By id">By id</option>
      </select>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
.header__wrapper {
  display: flex;
  justify-content: space-around;
}
.input {
  padding: 8px;
  border: 2px solid teal;
  border-radius: 4px;
}
.select {
  padding: 8px;
  border: 2px solid teal;
  border-radius: 4px;
}
</style>
