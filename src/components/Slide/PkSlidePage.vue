<template>
  <div class="pk-slide-page">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "PkSlidePage",
  props: {
    name: [Number, String],
    title: String,
    disabled: Boolean,
  },
}
</script>

<style scoped>

</style>
