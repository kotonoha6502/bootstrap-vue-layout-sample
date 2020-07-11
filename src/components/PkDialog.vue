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
      @click="!seamless && $emit('input', false)"
    >
      <b-col
        :class="containerClasses"
        :style="containerStyles"
        :cols="cols"
      >
        <div
          :style="justifierStyles"
          @click.stop.prevent="f=>f"
        >
          <slot></slot>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'PkDialog',
  props: {
    value: Boolean,
    position: {
      type: String,
      default: 'standard',
      validator (v) {
        return ['standard', 'top', 'bottom', 'right', 'left'].includes(v)
      }
    },
    cols: {
      type: [String, Number],
      default: 12,
      validator (v) {
        const numV = Number(v)
        if (isNaN(numV)) {
          return false
        }
        if (numV !== (numV|0)) {
          return false
        }
        if (numV <= 0 || numV > 12) {
          return false
        }
        return true
      }
    },
    seamless: Boolean,
  },
  data () {
    return {
      valueModel: false,

      showDialogContent: false,
      showBackdrop: false,
    }
  },
  computed: {
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
        justifyContent: this.position === 'right' ? 'flex-end' : (this.position === 'left' ? 'start' : 'center')
      }
    },
    justifierStyles () {
      return {
        pointerEvents: 'all',
        transition: 'transform .2s',
        transform: this.__contentTransform,
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
          return `translate(0, ${this.showDialogContent ? 0 : 'calc(0 - 100%)'})`
        case 'bottom':
          return `translate(0, ${this.showDialogContent ? 0 : 'calc(100%)'})`
        case 'left':
          return `translate(${this.showDialogContent ? 0 : 'calc(0px - 100%)'}, 0)`
        case 'right':
          return `translate(${this.showDialogContent ? 0 : 'calc(100%)'}, 0)`
      }
    },
  },
  watch: {
    value: async function (newValue) {
      if (newValue) {
        this.valueModel = !!newValue
        await this.__doOpen()
      }
      else {
        await this.__doHide()
        this.valueModel = !!newValue
      }
    },
  },
  methods: {
    async __doOpen () {
      await this.__sleep(1)
      this.showBackdrop = true
      await this.__sleep(100)
      this.showDialogContent = true
    },
    async __doClose () {
      await this.__doHide()
      this.valueModel = false
    },
    async __doHide () {
      this.showDialogContent = false
      this.showBackdrop = false
      await this.__sleep(300)
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
</style>