<template>
  <pk-field
    v-bind="attrs"
    v-on="listeners"
  >
    <template v-slot:control="{ focus, blur }">
      <input
        type="text"
        ref="native"
        class="pk-input__native"
        :style="nativeInputStyle"
        :value="attrs.value"
        @input="inputHandler"
        @focus="focus()"
        @blur="blur()"
      />
    </template>

    <!-- slotコンテンツを渡す -->
    <template
      v-for="(_, slot) of $scopedSlots"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>

  </pk-field>
</template>

<script>
import PkField from "@/components/Form/PkField";

export default {
  name: "PkInput",
  components: {PkField},

  props: {
    value: [Number, String],
    maxLength: Number,

    type: {
      type: String,
      default: 'text'
    },
  },

  data () {
    return {
      tmpValue: null
    }
  },

  computed: {
    nativeInputStyle () {
      return {
        outline: 'none',
        border: 'none',
        backgroundColor: 'initial',
        width: '100%',
        padding: '0'
      }
    },

    attrs () {
      return {
        ...this.$attrs,
        value: (this.valueModel ?? this.tmpValue)
      }
    },

    listeners () {
      return {
        ...this.$listeners,
        focus: () => {
          this.$refs.native.focus()
        },
        input: (v) => {
          if (this.value === undefined) {
            this.tmpValue = v
          }
          else {
            this.valueModel = v
          }
          this.$emit('input', v)
        }
      }
    },

    valueModel: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    },

  },

  methods: {
    inputHandler (e) {
      if (this.value === undefined) {
        this.tmpValue = e.target.value
      }
      else {
        this.valueModel = e.target.value
      }

      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style scoped>

</style>