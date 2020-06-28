<template>
  <b-row
    :class="classes"
    style="tab-index: -1; padding: 0; outline: none;"
    tabindex="2"
    @focus.stop.prevent="focused = true"
    @blur.stop.prevent="focused = false"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <b-col
      class="pk-field__outer-shell"
      :style="outerShellStyle"
      cols="12"
    >
      <div
        class="pk-field__inner-shell"
        :style="innerShellStyle"
      >
        <template v-if="!outlined">
          <transition name="horizontal">
            <div
                class="pk-field__inner-shell--focused"
                :style="{ backgroundColor: activeInnerShellColor }"
                v-if="focused"
            />
          </transition>
        </template>

        <div
          class="pk-field__control-container"
          :style="controlContainerStyle"
        >
          <div
              class="pk-field__prepend-slot"
              :style="prependStyle"
          >
            <slot name="prepend"></slot>
          </div>

          <div
            class="pk-field__native"
            :style="nativeStyle"
          >
            <div
              class="pk-field__label"
              :style="labelStyle"
            >
              {{ label }}
            </div>

            <template v-if="shouldShowPlaceholder">
              <div
                class="self-center full-width no-outline"
                style="transition: all 0.3s; font-size: 14px; color: #9e9e9e"
              >
                {{ placeholder }}
              </div>
            </template>
            <slot v-bind:value="valueModel">
              <div class="self-center full-width no-outline">{{ value }}</div>
            </slot>
          </div>

          <template v-if="clearable && !!valueModel">
            <div
              class="pk-field__clear-btn"
              style="z-index: 1;"
            >
              <v-fa
                :icon="clearIconName"
                @click.stop="valueModel = null"
              />
            </div>
          </template>

          <div
              class="pk-field__append"
              :style="appendStyle"
          >
            <slot name="append"></slot>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>

const defaultOutlineColor = '#c2c2c2'
const hoveredOutlineColor = "#151515"
const defaultLabelColor = '#5e5e5e'
const defaultActiveColor = '#3d91ff'
const defaultBgColor = '#f2f2f2'

const defaultClearBtnIcon = 'times-circle'

export default {
  name: 'PkField',

  props: {
    // behavior
    clearable: Boolean,
    stackedLabel: Boolean,

    // content
    clearIcon: String,
    label: String,
    placeholder: String,

    // model
    value: [Number, String],
    maxLength: Number,

    // state
    disable: Boolean,
    readonly: Boolean,
    loading: Boolean,

    // style
    filled: Boolean,
    outlined: Boolean,
    square: Boolean,
    rounded: Boolean,
    color: String,
    labelColor: String,
    bgColor: String,
    dense: Boolean,
  },

  data () {
    return {
      hovered: false,
      focused: false,
    }
  },

  computed: {
    classes () {
      return {
        'row no-wrap': true,
        'pk-field': true,

        [`pk-field--${this.styleType}`]: true,
        'pk-field--focused': this.focused,
        'pk-field--labeled': this.label !== void 0,
        'pk-field--dense': this.dense,
        'pk-field--readonly': this.readonly,
        'pk-field--disabled': this.disable,
      }
    },

    styleType () {
      if (this.filled) return 'filled'
      if (this.outlined) return 'outlined'

      return 'standard'
    },

    outerShellStyle() {
      const border = this.outlined ? 'border' : 'border-bottom'
      const borderColor = this.focused
          ? (hoveredOutlineColor)
          : (this.hovered
            ? hoveredOutlineColor
            : defaultOutlineColor
            )
      const backgroundColor = this.bgColor ?? (this.filled ? defaultBgColor : 'none')

      const filter = this.focused
          ? 'brightness(90%)'
          : ( this.hovered
            ? 'brightness(95%)'
            : 'none'
            )

      const borderRadius = this.square
          ? '0'
          : (this.outlined
            ? '4px'
            : '4px 4px 0 0'
            )

      return {
        padding: '0',
        margin: '0',
        transition: 'all 0.3s ease-in-out',
        boxSizing: 'border-box',
        filter: this.filled ? filter : 'none',
        [border]: `thin ${ this.readonly ? 'dashed' : 'solid'} ${borderColor}`,
        borderRadius,
        backgroundColor,
      }
    },

    innerShellStyle() {
    },

    controlContainerStyle() {
      const padding = (this.filled || this.outlined)
          ? '0 12px'
          : '0'

      return {
        margin: '0',
        padding,
        width: 'auto',
        display: 'flex',
        position: 'relative',
        minWidth: '0',
        maxWidth: '100%',
        flex: '10000 1 0',
      }
    },

    labelStyle () {
      const color = !this.focused
          ? this.labelColor ?? defaultLabelColor
          : this.labelColor ?? this.color ?? defaultActiveColor

      const transform = (this.focused || this.valueModel !== '' || this.stackedLabel)
          ? 'translateY(-40%) scale(0.75)'
          : 'none'

      return {
        color,
        transform,
      }
    },


    nativeStyle () {
      const paddingTop = this.label !== void 0 ? '24px' : '16px'
      const paddingBottom = this.label !== void 0 ? '8px' : '16px'

      const height = this.dense ? '56px' : '56px'
      return {
        fontWeight: '400',
        width: '100%',
        minWidth: '0',
        height,
        lineHeight: '18px',
        outline: '0',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        border: 'none',
        borderRadius: '0',
        background: 'none',
        color: 'rgba(0,0,0,0.87)',
        padding: `${paddingTop} 0 ${paddingBottom}`,
        cursor: this.disable ? 'not-allowed' : 'inherit',
        filter: this.disable ? 'opacity(0.55)' : 'inherit',
      }
    },

    prependStyle() {
      return {
        display: 'inline-flex',
        alignItems: 'center',
        paddingRight: this.hasPrependSlot ? '12px' : 'none',
      }
    },
    appendStyle () {
      return {
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: this.hasPrependSlot ? '12px' : 'none',
      }
    },

    hasPrependSlot () {
      return !!this.$slots.prepend
    },

    hasAppendSlot () {
      return !!this.$slots.append
    },

    shouldShowPlaceholder () {
      if (this.placeholder === void 0 || this.valueModel !== "") return false

      return this.label === void 0
        ? true
        : this.stackedLabel || this.focused
    },

    clearIconName () {
      return this.clearIcon ?? defaultClearBtnIcon
    },

    activeInnerShellColor () {
      return this.color ?? defaultActiveColor
    },

    valueModel: {
      get () {
        return (this.value === void 0 || this.value === null) ? '' : String(this.value)
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    },
  }
}
</script>

<style scoped>
  .pk-field {
    
  }
  
  .pk-field__outer-shell {
    
  }
  
  .pk-field__inner-shell {
    
  }
  
  .pk-field__control-container {

  }

  .pk-field__label {
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
  .pk-field__clear-btn {
    cursor: pointer;
    color: #7e7e7e;
    display: inline-flex;
    align-items: center;
    margin-left: 12px;
    transition: color 0.32s;
  }

  .pk-field__clear-btn:hover {
    color: #222222;
  }
  
  .pk-field__inner-shell--focused {
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

  .native {

  }
</style>