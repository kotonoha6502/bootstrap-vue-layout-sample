import Vue from 'vue'
import {slot} from "@/components/utils/slot";

export default Vue.extend({
    name: 'PkSlide',
    props: {
        value: [Number, String],
        noArrow: Boolean,
        noNavigation: Boolean,
    },
    data () {
        return {
            /** @type {?number} */
            slideIndex: null,
            /** @type {VNode[]} */
            slides: []
        }
    },
    computed: {
        controlSlotScope () {
            return {
                next: this.next,
                prev: this.prev,
                goto: this.goto,
            }
        },
        valueProxy: {
            get () {
                return this.value
            },
            set (v) {
                this.$emit('input', v)
            }
        }
    },
    methods: {
        prev () {
            this.__go(-1)
        },
        next () {
            this.__go(1)
        },
        goto (name) {
            this.valueProxy = name
        },
        __go (flipPagesCount, startIndex = this.slideIndex) {
            if (flipPagesCount === 0) {
                return
            }
            const slots = this.slides

            const direction = flipPagesCount >= 0 ? 1 : -1
            let i = startIndex + direction
            let moved = 1
            while (i > -1 && i < slots.length) {
                const slide = slots[i]
                if (this.__isValidSlide(slide)) {
                    this.valueProxy = slide.componentOptions.propsData.name
                    moved++
                    if (moved > Math.abs(flipPagesCount)) {
                        break
                    }
                }
                i += direction
            }
        },

        /**
         *
         * @param {VNode} slide
         * @return {boolean}
         * @private
         */
        __isValidSlide (slide) {
            const opts = slide.componentOptions?.propsData
            return (opts?.name !== undefined &&
                opts?.name !== '' &&
                opts?.disabled !== '' &&
                opts.disabled !== true
            )
        },

        /**
         *
         * @param slideName
         * @return {boolean}
         * @private
         */
        __isValidSlideName(slideName) {
            return slideName !== null && slideName !== undefined && slideName !== ''
        },

        /**
         * @return {VNode[]}
         * @private
         */
        __getAllSlides () {
            return this.slides.filter(slide => {
                return this.__isValidSlideName(slide.componentOptions?.propsData?.name)
            })
        },

        /**
         *
         * @returns {VNode[]}
         * @private
         */
        __getAvailableSlides() {
            return this.slides.filter(slide => {
                const opts = slide.componentOptions
                return opts &&
                    opts.propsData.name !== undefined &&
                    opts.propsData.disabled !== '' &&
                    opts.propsData.disabled !== true
            })
        },

        /**
         *
         * @param {string|number} name
         * @return {?number}
         * @private
         */
        __getSlideIndex(name) {
            return this.slides.findIndex(slide => {
                const opts = slide.componentOptions
                return opts &&
                    opts.propsData.name === name &&
                    opts.propsData.disabled !== '' &&
                    opts.propsData.disabled !== true
            })
        },

        __updateIndex() {
            const index = this.__getSlideIndex(this.valueProxy)

            if (this.slideIndex !== index) {
                this.slideIndex = index
            }

            return true
        },

        /**
         *
         * @param {CreateElement} h
         * @return {VNode[]}
         * @private
         */
        __renderControl (h) {
            const children = []

            const sideNavigation = (side) => {
                if (this.$scopedSlots[`control-${side}`] !== undefined) {
                    return this.$scopedSlots[`control-${side}`](this.controlSlotScope)
                }
                else {
                    const onClick = side === 'left'
                        ? this.prev
                        : side === 'right'
                            ? this.next
                            : () => {}

                    return [
                        h('b-button', {
                            attrs: {
                            variant: 'link' },
                            on: {
                                click: onClick },
                            style: {
                                alignSelf: 'center',
                            } },
                            [
                                h( 'v-fa', { attrs: { icon: `angle-${side}` } })
                            ]
                        )
                    ]
                }
            }
            if (! this.noArrow) {
                const prevNavigation = sideNavigation('left')
                children.push(
                    h('div', {
                        staticClass: 'pk-slide__control-container--left',
                        style: {
                            alignSelf: 'center',
                        }
                    }, prevNavigation)
                )
            }

            children.push(
                h('div', {
                    staticClass: 'pk-slide__control-container--page-view',
                    style: {
                        width: '100%',
                        flexWrap: 'nowrap',
                    }
                }, [ this.__renderSlide(h) ])
            )

            if (! this.noArrow) {
                const nextNavigation = sideNavigation('right')

                children.push(
                    h('div', {
                        staticClass: 'pk-slide__control-container--right',
                    }, nextNavigation)
                )
            }

            return children
        },
        /**
         *
         * @param {CreateElement} h
         * @returns {VNode}
         * @private
         */
        __renderSlide(h) {
            return this.__isValidSlideName(this.valueProxy) &&
                this.__updateIndex() &&
                this.slides[this.slideIndex]
        },

        /**
         *
         * @param {CreateElement} h
         * @return {VNode[]}
         * @private
         */
        __renderFooterControl (h) {
            return [
            ]
        },

        /**
         *
         * @param {CreateElement} h
         * @return {VNode[]}
         * @private
         */
        __renderContent (h) {
            const content = [
                h('div', {
                    staticClass: 'pk-slide__control-container',
                    style: {
                        display: 'flex',
                        alignItems: 'stretch',
                    },
                }, [ this.__renderControl(h) ])
            ]

            if (! this.noNavigation) {
                content.push(
                    h('div', {
                        staticClass: 'pk-slide__footer',
                    }, [ this.__renderFooterControl(h) ])
                )
            }

            return content
        },
    },
    render (h) {
        this.slides = slot(this, 'default', [])

        return h('div', {
            staticClass: 'pk-slide'
        }, this.__renderContent(h))
    }
})
