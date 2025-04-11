<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  margin: 0.5rem 0.75rem;
  padding: 1rem;
  border-radius: 3px;
  overflow: hidden;
}

@media screen and (min-width: 800px) {
  .card {
    width: 50%;
    max-width: 35rem;
    margin: 2rem auto;
  }
}
</style>
