<template>
  <b-container fluid>
    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
            label="Default field"
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
            label="outlined"
            outlined
            square
            clearable
            color="purple"
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
            label="Label colored"
            label-color="orange"
            outlined
            color="green"
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
            label="Filled"
            filled
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
            label="Outlined & filled"
            filled
            outlined
        >
          <template v-slot:append>
            <img src="../assets/logo.png" width="24px" />
          </template>

          <template v-slot:prepend>
            <v-fa icon="user" style="color: dodgerblue"/>
          </template>
        </pk-input>
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
            label="Label(stacked)"
            stack-label
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
          v-model="inputText"
          placeholder="プレースホルダー"
        >
          <template v-slot:prepend>
            <v-fa icon="home" size="lg" style="color: rebeccapurple" />
          </template>
        </pk-input>
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
          label="ラベルとプレースホルダー"
          v-model="inputText"
          placeholder="ここに入力"
          outlined
          bg-color="lavender"
          color="brown"
        />
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-3">
      <b-col offset="1" cols="4">
        <pk-input
          label="Label(stacked) & placeholder"
          v-model="inputText"
          outlined
          stack-label
          clearable
          placeholder="ここに入力"
        >
          <template v-slot:append>
            <v-fa icon="edit" size="lg" style="color: orange"/>
          </template>
        </pk-input>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import PkInput from '@/components/Form/PkInput'

export default {
  name: 'Home',
  components: {
    PkInput,
  },
  data () {
    return {
      inputText: null,
    }
  }
}
</script>
