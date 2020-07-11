<template>
  <b-container fluid>
    <b-select :options="options" v-model="position"/>
    <b-checkbox v-model="seamless" />
    <b-button
      variant="link"
      @click="showDialog = !showDialog"
    >
      Show Dialog
    </b-button>

    <pk-dialog
      v-model="showDialog"
      :seamless="seamless"
      :position="position"
    >
      <b-card style="overflow: auto; height: 100%">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </p>
      </b-card>
    </pk-dialog>

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
import PkInput from '@/components/Form/PkInput.vue'
import PkDialog from '@/components/PkDialog.vue'

export default {
  name: 'Home',
  components: {
    PkInput,
    PkDialog,
  },
  data () {
    return {
      inputText: "",
      showDialog: false,
      position: "standard",
      seamless: false,
      options: [
        { text: '中央', value: 'standard' },
        { text: '上', value: 'top' },
        { text: '下', value: 'bottom' },
        { text: '左', value: 'left' },
        { text: '右', value: 'right' },
      ]
    }
  }
}
</script>
