<template>
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
</template>

<script>
// @ is an alias to /src
import PkInput from '@/components/Form/PkInput.vue'

export default {
  name: 'Home',
  components: {
    PkInput,
  },
  data () {
    return {
      inputText: ""
    }
  }
}
</script>
