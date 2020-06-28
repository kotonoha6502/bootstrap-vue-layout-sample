<template>
  <pk-field
    v-bind="$attrs"
  >
    <template v-slot:default>
      <input
        type="text"
        v-model="valueModel"
      />
    </template>
  </pk-field>
</template>

<script>
import PkField from "@/components/Form/PkField";

export default {
  name: "PkInput",
  components: {PkField},
}
</script>

<style scoped>

</style>