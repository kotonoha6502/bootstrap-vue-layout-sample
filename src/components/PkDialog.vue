<template>
  <b-container
    v-if="valueModel"
    fluid
    :class="classes"
    :style="styles"
  >
    <b-row
      :class="innerClasses"
      :style="innerStyles"
      :align-v="verticalAlign"
      :align-h="horizontalAlign"
      @click="!seamless && __onBackdropClick()"
    >
      <b-col
        :class="containerClasses"
        :style="containerStyles"
      >
        <div
          :style="justifierStyles"
          @click.stop.prevent="f=>f"
          @keyup.esc="__onEscape"
          tabindex="0"
          ref="justifierRef"
        >
          <slot
            name="default"
            v-bind="contentSlotScopes"
          />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

const childHasFocus = (el, focusedEl) => {
  if (el === undefined || focusedEl === undefined) {
    return false
  }

  if (el.contains(focusedEl)) {
    return true
  }

  for (let next = el.nextElementSibling; next !== null; next = next.nextElementSibling) {
    if (next.contains(focusedEl)) {
      return true
    }
  }

  return false
}

export default {
  name: 'PkDialog',
  props: {
    // Behavior
    seamless: Boolean,
    persistent: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    position: {
      type: String,
      default: 'standard',
      validator (v) {
        return ['standard', 'top', 'bottom', 'right', 'left'].includes(v)
      }
    },
    // Model
    value: Boolean,
    // Style
    fullWidth: Boolean,
    fullHeight: Boolean,
  },
  data () {
    return {
      valueModel: false,

      showDialogContent: false,
      showBackdrop: false,
    }
  },
  computed: {
    useBackdrop () {
      return !this.seamless
    },
    classes () {
      return {
        'pk-dialog': true,
      }
    },
    styles () {
      return {
        position: 'fixed',
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: '100vh',
        width: '100vw',
        zIndex: 1000,
        pointerEvents: 'none',
      }
    },
    innerClasses () {
      return {
        'pk-dialog__inner': true,
        'pk-dialog__inner-backdrop': !this.seamless,
        'm-0': true,
        'p-0': true,
      }
    },
    innerStyles () {
      return {
        height: '100%',
        width: '100%',
        pointerEvents: this.seamless ? 'none' : 'all',
        backgroundColor: this.seamless ? 'none' : `rgba(0,0,0,${this.showBackdrop ? 0.3 : 0.0})`,
        transition: 'background-color .2s',
      }
    },
    containerClasses () {
      return {
      }
    },
    containerStyles () {
      return {
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: this.position === 'right' ? 'flex-end' : (this.position === 'left' ? 'start' : 'center'),
        padding: 0,
        height: this.fullHeight ? 'calc(100vh - 48px)' : 'none',
        maxHeight: 'calc(100vh - 48px)',
      }
    },
    justifierClasses () {
      return {

      }
    },
    justifierStyles () {
      return {
        outline: 'none',
        pointerEvents: 'all',
        transition: 'transform .32s',
        transform: this.__contentTransform,
        width: this.fullWidth ? 'calc(100vw - 48px)' : 'none',
        maxWidth: 'calc(100vw - 48px)',
      }
    },
    verticalAlign () {
      return this.position === 'top'
        ? 'start'
        : (this.position === 'bottom'
          ? 'end'
          : 'center'
          )
    },
    horizontalAlign () {
      return this.position === 'left'
        ? 'start'
        : (this.position === 'right'
          ? 'end'
          : 'center'
          )
    },
    __contentTransform () {
      switch (this.position) {
        case 'standard':
          return this.showDialogContent ? 'scale(1.0, 1.0)' : 'scale(0, 0)'
        case 'top':
          return `translate(0, ${this.showDialogContent ? 0 : 'calc(0px - 100%)'})`
        case 'bottom':
          return `translate(0, ${this.showDialogContent ? 0 : 'calc(100%)'})`
        case 'left':
          return `translate(${this.showDialogContent ? 0 : 'calc(-16px - 100%)'}, 0)`
        case 'right':
          return `translate(${this.showDialogContent ? 0 : 'calc(16px + 100%)'}, 0)`
      }
    },
    contentSlotScopes () {
      return {
        close: this.close,
        shake:() => {},
      }
    },
  },
  watch: {
    value: async function (newValue) {
      if(newValue) {
        await this.__doOpen()
        return
      }
      else {
        await this.__doClose()
        return
      }
    },
    useBackdrop (v) {
      this.__preventFocusOut(v)
    },
  },
  methods: {
    close () {
      this.__emitValue(false)
    },
    shake () {
      return this.__doShake()
        .then(() => {
          this.$emit('shake')
        })
    },
    focus () {
      this.$nextTick(() => this.$refs.justifierRef.focus())
    },
    async __doOpen () {
      this.valueModel = true

      this.$emit('before-open')
      await this.__sleep(1)

      if (this.useBackdrop) {
        this.showBackdrop = true
        this.__preventFocusOut(true)
      }
      await this.__sleep(100)

      this.showDialogContent = true
      this.$emit('open')
      this.focus()
    },
    async __doClose () {
      this.$emit('before-close')

      this.showDialogContent = false
      if (this.useBackdrop) {
        this.showBackdrop = false
        this.__preventFocusOut(false)
      }
      await this.__sleep(300)

      this.valueModel = false
      this.$emit('close')
    },
    async __doShake () {
      const node = this.$refs.justifierRef
      node.classList.remove('pk-dialog__justifier--animation-shake')
      node.classList.add('pk-dialog__justifier--animation-shake')
      clearTimeout(this.shakeTimeout)
      this.shakeTimeout = setTimeout(() => {
        node.classList.remove('pk-dialog__justifier--animation-shake')
      }, 120)
    },
    async __onBackdropClick () {
      if (!this.persistent && !this.noBackdropDismiss) {
        this.close()
      }
      else {
        this.shake()
      }
    },
    __onEscape (e) {
      if (!this.persistent && !this.noEscDismiss) {
        this.$emit('escape')
        this.close()
      }
      else {
        this.shake()
      }
    },
    __preventFocusOut (state) {
      const action = `${state === true ? 'add' : 'remove'}EventListener`
      document.body[action]('focusin', this.__onFocusChange)
    },
    __onFocusChange(e) {
      if (this.showDialogContent && !childHasFocus(this.$el, e.target)) {
        this.focus()
      }
    },
    __emitValue(v) {
      this.$emit('input', v)
    },
    __sleep (t) {
      return new Promise(resolve => setTimeout(resolve, t));
    }
  },
}
</script>

<style scoped>
  .pk-dialog__justifier--animation-shake {
    animation: shake .12s
  }

  @keyframes shake {
    0% {
      transform: scale(1.0,1.0)
    }
    50% {
      transform: scale(1.02,1.02)
    }
    100% {
      transform: scale(1.0,1.0)
    }
  }

</style>