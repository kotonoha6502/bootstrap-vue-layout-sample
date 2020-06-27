<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'PageContainer',
    computed: {

    },
    methods: {
        alignRight() {
            this.$emit('alignRight')
        },
        alignLeft() {
            this.$emit('alignLeft')
        },
        alignCenter() {
            this.$emit('alignCenter')
        }
    }
}
</script>