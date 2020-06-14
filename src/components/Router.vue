<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="#">レイアウトサンプル</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
      
      <b-nav-item-dropdown text="メニュー" class="drowdown-menu">
          <b-dropdown-item :to="{ path: '/' }" :key="0">ページ１</b-dropdown-item>
          <b-dropdown-item :to="{ path: '/about' }" :key="1">ページ２</b-dropdown-item>
      </b-nav-item-dropdown>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
    name: 'Router',
    components: {}
}
</script>

<style scoped>
    .height-enter-active {
        overflow: hidden;
        transition: height .2 ease-in-out;
    }
    .height-leave-active {
        overflow: hidden;
        transition: height .2 ease-in-out;
    }

  .dropdown-menu {
      transform: height .4s;
  }
</style>