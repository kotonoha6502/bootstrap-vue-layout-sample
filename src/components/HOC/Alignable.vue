<template>
    <b-row>
        <b-col :cols="leftCols"
                style="background-color: red;"
                class="left-padding"
                :class="{ 'col-0': !showLeftPadding }"
        >
        </b-col>

        <b-col >
            <slot v-bind="$attrs"
                  v-on="hooks"
            ></slot>
        </b-col>

            <b-col :cols="rightCols"
                style="background-color: red;"
                class="right-padding"
                :class="{ 'col-0': !showRightPadding }"
            >
            </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'Alignable',
    data() {
        return {
            align: 'center'
        }
    },
    computed: {
        hooks() {
            return {
                ...this.$listeners
            }
        },
        showLeftPadding() {
            return this.align !== 'left'
        },

        showRightPadding() {
            return this.align !== 'right'
        },

        leftCols() {
            return this.align === 'right' ? 2 : 1
        },

        rightCols() {
            return this.align === 'left' ? 2 : 1
        }
    },
}
</script>


<style scoped>
    .row [class*='col-'] {
        transition: all 0.2s ease-out;
    }

    .col-0 {
        flex-basis: 1px;
        padding: 0;
    }

    .right-padding .col-0 {
        transform-origin: right;
    }

    .left-padding {
        transform-origin: left;
    }

</style>