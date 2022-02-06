<template>
  <button class="btn" type="button"><slot></slot></button>
</template>

<script>
export default {};
</script>

<style scoped>
.btn {
  padding: 4px;
  border-radius: 8px;
  border: 1px solid teal;
  background-color: transparent;
  cursor: pointer;

  transition: background-color 250ms ease-in;
}
.btn:hover {
  background-color: lightcyan;
}
.btn:disabled {
  text-decoration: line-through;
}
.btn:disabled.btn:hover {
  background-color: tomato;
}
</style>
