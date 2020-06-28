<template>
  <b-container fluid>
    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4" class="text-left">
        <pk-input
          v-model="inputText"
          label="Default"
          clearable
          clear-icon="times"
        >
          <template v-slot:prepend>
            <v-fa icon="home" />
          </template>

          <template v-slot:append>
            <v-fa icon="edit" />
          </template>
        </pk-input>
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
            v-model="inputText"
            filled
            label="Filled"
            clearable
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
            v-model="inputText"
            color="purple"
            outlined
            label="Colored"
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4" class="text-left">
        <pk-input
            v-model="inputText"
            label="Colored label"
            label-color="orange"
            readonly
            color="green"
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
            v-model="inputText"
            label="Label(stacked)"
            label-stacked
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
            v-model="inputText"
            placeholder="プレースホルダー"
            label-stacked
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
            v-model="inputText"
            label="Label and placeholder"
            placeholder="プレースホルダー"
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
            v-model="inputText"
            placeholder="プレースホルダー"
            filled
            bg-color="pink"
            label-stacked
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
            v-model="inputText"
            label="Label(stacked) and placeholder"
            square
            outlined
            placeholder="プレースホルダー"
            label-stacked
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
            v-model="inputText"
            label="Label(stacked) and placeholder"
            filled
            placeholder="プレースホルダー"
            label-stacked
        >
          <template v-slot:prepend>
            <v-fa icon="home" />
          </template>
        </pk-input>
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
      inputText: "",
    }
  }
}
</script>
