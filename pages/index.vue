<template>
    <div class="container">
        <div>
            <h1>Заказы</h1>
            <button @click="addM">Добавить</button>
            <button @click="delM">Удалить</button>
            <button @click="auth">Стук</button>
        </div>
        <div>
            <m-notification :messages="array" />
        </div>
    </div>
</template>

<script>
import MNotification from '@/components/popup/m-notification'
export default {
    components: { MNotification },
    data: () => ({
        array: [],
        id: 1,
    }),
    methods: {
        addM() {
            this.id += 1
            this.array.unshift({ id: this.id, header: 'Заказ', text: 'one' })
        },
        delM() {
            this.array.splice(0, 1)
        },
        auth() {
            this.$axios({
                method: 'get',
                url: 'https://192.168.137.100:52757/rk7api/v1/serverstatus.xml',
            }).then((res) => console.log('ответ', res))
        },
    },
}
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    text-align: center;
}

.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
        BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
