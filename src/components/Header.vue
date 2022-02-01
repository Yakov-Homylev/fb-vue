<template>
  <header>
    <div class="header__wrapper">
      <input v-on:input="changeFilter" class="input" type="text" />
      <select v-on:change="selectedSort" class="select" name="sort">
        <option disabled value="Choose sort">Choose sort</option>
        <option value="id">By id</option>
        <option value="login">By login</option>
      </select>
    </div>
  </header>
</template>

<script>
export default {
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
    selectedSort(e) {
      const sort = e.target.value;
      this.$emit("update:sort", sort);
      console.log(sort);
    },
    changeFilter(e) {
      const filter = e.target.value.toLowerCase();
      this.$emit("update:filter", filter);
      console.log(filter);
    },
  },
};
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
