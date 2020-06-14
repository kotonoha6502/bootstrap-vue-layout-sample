<template>
    <div class="home">
      <b-button @click="toggleSideBar" >
        サイドバー
      </b-button>
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>

      <b-sidebar v-model="showSideBar" right>
      </b-sidebar>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
      return {
          showSideBar: false
      }
  },
  methods: {
      toggleSideBar() {
          this.showSideBar = !this.showSideBar

          this.$emit('sideBarToggled', this.showSideBar)
      }
  }
}
</script>
