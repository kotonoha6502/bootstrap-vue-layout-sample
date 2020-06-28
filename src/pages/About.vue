<template>
  <div class="about">
    <h1>This is an about page</h1>

    <b-container fluid>
      <b-row class="mt-3 mb-3">
        <b-col offset="1" cols="4">
          <pk-field
            label="Default field"
          />
        </b-col>
      </b-row>

      <b-row class="mt-3 mb-3">
        <b-col offset="1" cols="4">
          <pk-field
              label="outlined"
              outlined
              square
              color="purple"
          />
        </b-col>
      </b-row>

      <b-row class="mt-3 mb-3">
        <b-col offset="1" cols="4">
          <pk-field
              label="Label colored"
              label-color="orange"
              outlined
              color="green"
          />
        </b-col>
      </b-row>

      <b-row class="mt-3 mb-3">
        <b-col offset="1" cols="4">
          <pk-field
              label="Filled"
              filled
          />
        </b-col>
      </b-row>

      <b-row class="mt-3 mb-3">
        <b-col offset="1" cols="4">
          <pk-field
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
          </pk-field>
        </b-col>
      </b-row>

      <b-row class="mt-3 mb-3">
        <b-col offset="1" cols="4">
          <pk-field
              label="Label(stacked)"
              stacked-label
          />
        </b-col>
      </b-row>

      <b-row class="mt-3 mb-3">
        <b-col offset="1" cols="4">
          <pk-field
              placeholder="プレースホルダー"
          >
            <template v-slot:prepend>
              <v-fa icon="home" size="lg" style="color: rebeccapurple" />
            </template>
          </pk-field>
        </b-col>
      </b-row>

      <b-row class="mt-3 mb-3">
        <b-col offset="1" cols="4">
          <pk-field
              label="ラベルとプレースホルダー"
              placeholder="ここに入力"
              outlined
              bg-color="lavender"
              color="brown"
          />
        </b-col>
      </b-row>

      <b-row class="mt-3 mb-3">
        <b-col offset="1" cols="4">
          <pk-field
              label="Label(stacked) & placeholder"
              outlined
              stacked-label
              placeholder="ここに入力"
          >
            <template v-slot:append>
              <v-fa icon="edit" size="lg" style="color: orange"/>
            </template>
          </pk-field>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>
<script>
import PkField from "@/components/Form/PkField.vue";
import PkInput from "@/components/Form/_PkInput";
export default {
  name: 'About',
  components: {PkInput, PkField},
  data () {
    return {
      text: "This is a pen",
    }
  }
}
</script>