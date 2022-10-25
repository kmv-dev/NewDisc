<template>
  <div class="main">
    <div class="main__content">
      <h1>Каталог курсов</h1>
      <div class="main__search">
        <input type="text">
        <button><span class="icon-search"></span></button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  &__content {
    @include container;
  }
}
</style>
