<template>
  <b-row
    class="pk-input"
    @mouseenter="!disable && (hovered = true)"
    @mouseleave="!disable && (hovered = false)"
  >
    <b-col
      cols="12"
      class="row no-wrap"
      :class="{ 'pk-input__shell': focused }"
      :style="shellStyle"
    >

      <div
        class="pk-input__prepend-slot"
        :style="prependStyle"
      >
        <slot name="prepend"></slot>
      </div>

      <div
        class="pk-input__form-container"
        style="width: auto; position: relative; min-width: 0; max-width: 100%; flex: 10000 1 0"
      >
        <input
          type="text"
          class="pk-input__native"
          :placeholder="placeholderValue"
          :style="innerShellStyle"
          :maxlength="maxLength"
          :disabled="disable || readonly"
          @focus="!readonly && (focused = true)"
          @blur="focused = false"
          v-model="valueModel"
        />
        <div
            class="pk-input__label"
            :style="labelStyle"
        >
          {{ label }}
        </div>
      </div>

      <template v-if="clearable && !!valueModel">
        <div
            class="pk-input__clear-btn"
        >
          <v-fa :icon="clearIcon" size="md" @click.stop="valueModel = ''" />
        </div>
      </template>

      <div
          class="pk-input__append-slot"
          :style="appendStyle"
      >
        <slot name="append"></slot>
      </div>

      <template v-if="!outlined">
        <transition name="horizontal">
          <div
              class="pk-input__focus-line"
              :style="{ backgroundColor: focusLineColor }"
              v-if="focused"
          />
        </transition>
      </template>
    </b-col>
  </b-row>
</template>

<script>

const defaultOutlineColor = '#c2c2c2'
const hoveredOutlineColor = "#151515"
const defaultLabelColor = '#5e5e5e'
const defaultActiveColor = '#0055bf'
const defaultBgColor = '#f2f2f2'

export default {
  name: "PkInput",
  props: {
    value: [String, Number],
    maxLength: Number,
    label: String,
    placeholder: String,
    color: String,
    labelColor: String,
    bgColor: String,
    labelStacked: Boolean,
    outlined: Boolean,
    square: Boolean,
    filled: Boolean,
    disable: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    clearIcon: { type: String, default: 'times-circle' }
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
        ? (hoveredOutlineColor)
        : (this.hovered
          ? hoveredOutlineColor
          : defaultOutlineColor
          )
      const backgroundColor = !this.filled
          ? 'none'
          : (this.bgColor ?? defaultBgColor)

      const filter = this.focused
        ? 'brightness(90%)'
        : ( this.hovered
          ? 'brightness(95%)'
          : 'none'
          )

      const padding = (this.filled || this.outlined)
        ? '0 12px'
        : '0'

      const borderRadius = this.square
        ? '0'
        : (this.outlined
          ? '4px'
          : '4px 4px 0 0'
          )

      return {
        transition: 'all 0.3s ease-in-out',
        boxSizing: 'border-box',
        [border]: `thin ${ this.readonly ? 'dashed' : 'solid'} ${borderColor}`,
        filter: this.filled ? filter : 'none',
        backgroundColor,
        padding,
        borderRadius,
      }
    },
    labelStyle () {
      const color = !this.focused
        ? this.labelColor ?? defaultLabelColor
        : this.labelColor ?? this.color ?? defaultActiveColor

      const transform = (this.focused || this.valueModel !== '' || this.labelStacked)
        ? 'translateY(-40%) scale(0.75)'
        : 'none'

      return {
        color,
        transform,
      }
    },
    innerShellStyle() {
      const paddingTop = this.label !== void 0 ? '24px' : '16px'
      const paddingBottom = this.label !== void 0 ? '8px' : '16px'

      const border = this.outlined && this.focused
        ? `2px solid ${this.focusLineColor}`
        : 'none'
      return {
        padding: `${paddingTop} 0 ${paddingBottom}`,
        cursor: this.disable ? 'not-allowed' : 'inherit',
        filter: this.disable ? 'opacity(0.55)' : 'inherit',
        border,
      }
    },
    focusLineColor() {
      return this.color ?? defaultActiveColor
    },
    prependStyle() {
      return {
        display: 'inline-flex',
        alignItems: 'center',
        marginRight: this.hasPrependSlot ? '12px' : 'none',
      }
    },
    appendStyle() {
      return {
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: this.hasPrependSlot ? '12px' : 'none',
      }
    },
    hasPrependSlot() {
      return !!this.$slots.prepend
    },
    hasAppendSlot() {
      return !!this.$slots.append
    },
    valueModel: {
      get () {
        return this.value
      },
      set (newValue) {
        const payload = this.maxLength !== void 0 && String(newValue).length > this.maxLength
          ? String(newValue).slice(0, this.maxLength)
          : newValue

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
    line-height: 24px;
    letter-spacing: .00937em;
    border: none;
    background: none;
    color: rgba(0,0,0,0.87);
    outline: 0;
    font-size: 14px;
    width: 100%;
    min-width: 0;
}

  .pk-input__label {
    pointer-events: none;
    position: absolute;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    top: 18px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: .00937em;
    transform-origin: left top;
    transition:
      transform 0.36s cubic-bezier(0.4,0,0.2,1),
      right 0.324s cubic-bezier(0.4,0,0.2,1);
  }
  .pk-input__clear-btn {
    cursor: pointer;
    color: #7e7e7e;
    display: inline-flex;
    align-items: center;
    margin-left: 12px;
    transition: color 0.32s;
  }

  .pk-input__clear-btn:hover {
    color: #222222;
  }
  .pk-input__focus-line {
    position: absolute;
    content: '';
    width: 100%;
    height: 2px;
    bottom: -1px;
    right: 0;
    transition: transform 0.3s ease-in-out;
  }

  .horizontal-enter,
  .horizontal-leave-to {
    transform: scale(0, 1.0)
  }
  .horizontal-enter-to,
  .horizontal-leave {
    transform: scale(1.0, 1.0)
  }
</style>
