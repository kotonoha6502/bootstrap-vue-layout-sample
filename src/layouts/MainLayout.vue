<template>
    <div>
        <MainMenu />
        <router-view />
    </div>
</template>

<script>
import MainMenu from '../components/MainMenu.vue'

export default {
    name: 'MainLayout',
    components: {MainMenu}
}
</script>

<style scoped>
</style>