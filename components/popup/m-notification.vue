<template>
    <div class="m-notification">
        <transition-group name="m-transition-anim">
            <m-notification-item
                v-for="mes in messages"
                :key="mes.id"
                :notification="mes"
            />
        </transition-group>
    </div>
</template>

<script>
import MNotificationItem from '@/components/popup/m-notification-item'

export default {
    name: 'MNotification',
    components: { MNotificationItem },
    props: {
        messages: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
}
</script>

<style scoped></style>
