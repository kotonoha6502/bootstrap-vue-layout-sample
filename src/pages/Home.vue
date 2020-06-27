<template>
<<<<<<< HEAD
  <b-container fluid>
    <b-row class="mt-3">
      <b-col offset="1" cols="10">
        <pk-input
          v-model="inputText"
          label="Label"
        />
        model: {{ inputText }}
      </b-col>
    </b-row>
  </b-container>
=======
    <div class="home">
      <b-button @click="toggleSideBar" >
        サイドバー
      </b-button>
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>

      <b-sidebar v-model="showSideBar" right>
      </b-sidebar>
    </div>
>>>>>>> 73e6c92e109b1f5d0015e5e8bdfb53a167bab26e
</template>

<script>
// @ is an alias to /src
<<<<<<< HEAD
import PkInput from '@/components/Form/PkInput.vue'
=======
import HelloWorld from '@/components/HelloWorld.vue'
>>>>>>> 73e6c92e109b1f5d0015e5e8bdfb53a167bab26e

export default {
  name: 'Home',
  components: {
<<<<<<< HEAD
    PkInput,
  },
  data () {
    return {
      inputText: ""
    }
=======
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
>>>>>>> 73e6c92e109b1f5d0015e5e8bdfb53a167bab26e
  }
}
</script>
