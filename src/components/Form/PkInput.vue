<template>
  <b-row
    class="pk-input"
  >
    <b-col
      cols="12"
      class="pl-0 pr-0"
      :style="shellStyle"
    >
      <div
        class="pk-input__label"
        :style="labelStyle"
      >
        {{ label }}
      </div>
      <input
        type="text"
        :placeholder="placeholderValue"
        @focus="focused = true"
        @blur="focused = false"
        v-model="valueModel"
      />
    </b-col>
    focused: {{ focused ? 'ON' : 'OFF' }}
  </b-row>
</template>

<script>

const defaultOutlineColor = '#aeaeae'
const hoveredOutlineColor = "#5e5e5e"
const defaultLabelColor = '#0055bf'
const defaultActiveColor = '#0055bf'

export default {
  name: "PkInput",
  props: {
    value: String,
    label: String,
    placeholder: String,
    color: String,
    labelColor: String,
    outlined: { type: Boolean, default: false },
    filled: { type: Boolean, default: false },  
  },
  data () {
    return {
      focused: false,
      hovered: false,
    }
  },
  computed: {
    shellStyle () {
      const border = this.outlined ? 'border' : 'border-bottom'
      const borderColor = this.focused
        ? (this.color ?? defaultActiveColor)
        : (this.hovered
          ? hoveredOutlineColor
          : defaultOutlineColor
          )
      return {
          [border]: `thin solid ${borderColor}`
      }
    },
    labelStyle () {
      const style = {}

      style.color = this.labelColor ?? defaultLabelColor

      if (this.focused) {
        style.color = this.labelColor ?? this.color ?? defaultActiveColor
      }

      if (this.focused || this.valueModel !== '') {
        style.transform = 'translateY(-40%) scale(0.75)'
      }

      return style
    },
    valueModel: {
      get () {
        return String(this.value)
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    },
    placeholderValue () {
      if (this.label === void 0) {
        return this.placeholder
      }
      
      return this.labelStacked || this.focused || this.valueModel !== ""
        ? this.placeholder
        : void 0
    }
  }
}
</script>

<style scoped>
  input[type="text"] {
    overflow: visible;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: .00937em;
    border: none;
    background: none;
    color: rgba(0,0,0,0.87);
    outline: 0;
    padding: 24px 0 8px;
    width: 100%;
    min-width: 0;
}

  .pk-input__label {
    pointer-events: none;
    position: absolute;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    left: 0;
    top: 18px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: .00937em;
    transform-origin: left top;
    transition: transform 0.36s cubic-bezier(0.4,0,0.2,1),right 0.324s cubic-bezier(0.4,0,0.2,1);
  }
</style>
