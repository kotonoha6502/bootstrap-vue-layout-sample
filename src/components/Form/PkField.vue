<template>
  <b-row
    :class="classes"
    style="tab-index: -1; padding: 0; outline: none;"
    tabindex="2"
    @focus.stop.prevent="(focused = true) && $emit('focus', $el)"
    @blur.stop.prevent="(focused = false) || $emit('focus', $el)"
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
      />
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
            class="pk-field__label self-center full-width no-outline"
            :style="labelStyle"
          >
            {{ label }}
          </div>

          <div
            class="self-center full-width no-outline"
            :style="placeholderStyle"
          >
            {{ placeholder }}
          </div>

          <slot name="control" v-bind="controlSlotScope">
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
    </b-col>
  </b-row>
</template>

<script>

const defaultOutlineColor = '#c2c2c2'
const hoveredOutlineColor = "#151515"
const defaultLabelColor = '#9f9f9f'
const defaultActiveColor = '#3d91ff'
const defaultBgColor = '#f2f2f2'

const defaultClearBtnIcon = 'times-circle'

export default {
  name: 'PkField',

  props: {
    // behavior
    clearable: Boolean,
    stackLabel: Boolean,

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
          ? (this.outlined ? (this.color ?? defaultActiveColor) : hoveredOutlineColor)
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
      if (this.outlined) {
        return {
          position: 'absolute',
          border: `1px solid ${this.color ?? defaultActiveColor }`,
          width: '100%',
          height: '100%',
          left: '0',
          top: '0',
          opacity: this.focused ? '1.0' : '0.0',
          transition: 'opacity .3s linear',
        }
      }
      else {
        return {
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: '1px',
          boxSizing: 'border-box',
          borderBottom: `2px solid ${this.color ?? defaultActiveColor}`,
          transition: 'transform .3s ease-in-out',
          transform: `scale(${this.focused ? '1.0' : '0.0'}, 1.0)`
        }
      }
    },

    controlContainerStyle() {
      const margin = (this.filled || this.outlined)
          ? '0 12px'
          : '0'

      return {
        margin,
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

      const transform = (this.focused || this.valueModel !== '' || this.stackLabel)
          ? 'translateY(-40%) scale(0.75)'
          : 'none'

      return {
        color,
        transform,
      }
    },

    placeholderStyle () {
      return {
        position: 'absolute',
        pointerEvents: 'none',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        top: this.outlined ? '24px' : '18px',
        lineHeight: '24px',
        color: '#9e9e9e',
        transition: 'all 0.3s',
        opacity: this.shouldShowPlaceholder ? '1.0' : '0'
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
      return !!this.$scopedSlots.prepend
    },

    hasAppendSlot () {
      return !!this.$scopedSlots.append
    },

    shouldShowPlaceholder () {
      if (this.placeholder === void 0 || this.valueModel !== "") return false

      return this.label === void 0
        ? true
        : this.stackLabel || this.focused
    },

    clearIconName () {
      return this.clearIcon ?? defaultClearBtnIcon
    },

    controlSlotScope () {
      return {
        field: this.$el,
        focus: this.__focus,
        blur: this.__blur,
        hasValue: this.hasValue,
      }
    },

    valueModel: {
      get () {
        return (this.value === void 0 || this.value === null) ? '' : String(this.value)
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    },
  },

  methods: {
    __focus () {
      this.focused = true
    },

    __blur () {
      this.focused = false
    }
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