<template>
    <div class="m-notification__content">
        <div>
            <div class="m-notification__header">
                <span>{{ notification.text }}</span>
                <i class="icon">check_circle</i>
            </div>
            <div class="m-notification__body">
                <span>{{ notification.header }} {{ notification.id }}</span>
                <i class="icon">check_circle</i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MNotificationItem',
    props: {
        notification: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
}
</script>

<style scoped></style>
