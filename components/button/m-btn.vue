<template>
    <div class="m-btn" :class="className" @click="click">
        <!--<i class="material-icons">e dit</i>-->
        <span>{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: 'MBtn',
    props: {
        title: {
            type: String,
            default: 'button',
        },
        disabled: Boolean,
        error: Boolean,
    },
    computed: {
        className() {
            return {
                disabled: this.disabled,
                error: this.error,
            }
        },
    },
    methods: {
        click() {
            this.$emit('click')
        },
    },
}
</script>

<style scoped></style>
