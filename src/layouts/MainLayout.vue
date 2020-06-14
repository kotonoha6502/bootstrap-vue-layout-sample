<template>
<div>
    <Router />
    <b-container fluid>
        <b-row>
            <b-col
                :cols="leftCols"
                class="left-padding"
                :class="{ 'col-0': !showLeftPadding }"

            >
            </b-col>

            <b-col>
                <router-view @sideBarToggled="toggleAlign"
                />
            </b-col>

            <b-col
                :cols="rightCols"
                class="right-padding"
                :class="{ 'col-0': !showRightPadding }"
            >
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import Router from '../components/Router.vue'
import PageContainer from '../components/PageContainer.vue'

export default {
    name: 'MainLayout',
    components: {Router, PageContainer},
    data() {
        return {
            align: 'center',
        }
    },
    computed: {
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
    methods: {
        toggleAlign(shown) {
            this.align = shown ? 'left' : 'center'
        },

    }
}
</script>
<style scoped>
    .row [class*='col-'] {
        transition: all 0.333s ease-out;
    }

    .col-0 {
        flex-basis: 1px;
        padding: 0;
    }

    .right-padding .col-0 {
        transform-origin: right;
    }

    .left-padding .col-0 {
        transform-origin: left;
    }
</style>