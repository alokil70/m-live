<template>
    <div class="center">
        <div class="card w460">
            <h1 class="flex-center-align fz28">Авторизация</h1>
            <form class="m24">
                <m-input-email
                    v-model.trim="$v.login.email.$model"
                    label="Логин"
                />
                <m-input
                    v-model.trim="$v.login.email.$model"
                    label="Логин"
                /><m-input
                    v-model.trim="$v.login.email.$model"
                    label="Логин"
                    :error="!$v.login.email.required"
                    :info-span01="infoMessage"
                    :class="{
                        error:
                            ($v.login.email.$dirty &&
                                !$v.login.email.required) ||
                            ($v.login.email.$dirty && !$v.login.email.email),
                    }"
                />
                <m-input
                    v-model.trim="$v.login.password.$model"
                    label="Пароль"
                    type="password"
                    :error="
                        !$v.login.password.required ||
                        !$v.login.password.minLength
                    "
                    :class="{
                        error:
                            ($v.login.password.$dirty &&
                                !$v.login.password.required) ||
                            ($v.login.password.$dirty &&
                                !$v.login.password.minLength),
                    }"
                />
            </form>
            <div class="flex">
                <m-btn
                    class="bg-red"
                    :disabled="loading"
                    title="Войти"
                    @click="userLogin"
                />
                <m-btn
                    class="bg-red"
                    :disabled="loading"
                    title="Создать пользователя"
                    @click="userCreate"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import MInput from '@/components/form/m-input'
import MInputEmail from '@/components/form/m-input-email'
import MBtn from '~/components/button/m-btn'

export default {
    name: 'Login',
    components: { MInputEmail, MInput, MBtn },
    layout: 'empty',
    auth: false,
    validations: {
        login: {
            email: { email, required },
            password: { required, minLength: minLength(10) },
        },
    },
    data: () => ({
        login: {
            email: 'user1@gmail.com',
            password: 'qwertyuiop',
        },
        infoMessage: '',
        error: false,
        loading: false,
    }),
    computed: {
        /* isError() {
            return (this.error = true)
        } */
    },
    methods: {
        invalid() {
            if (!this.$v.login.email.email) {
                this.error = true
                return 'Поле заполнено некорректно'
            }
            if (!this.$v.login.email.required) {
                this.error = true
                this.infoMessage = 'Поле обязательно для заполнения'
                return true
            }
        },
        async userLogin() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                this.error = true
                return
            }
            this.loading = true
            try {
                await this.$auth
                    .loginWith('local', {
                        data: this.login,
                    })
                    .then((e) => {
                        this.loading = false
                        this.login.email = ''
                        this.login.password = ''
                        this.error = e.message
                        this.$router.push('/')
                    })
                    .catch((e) => {
                        this.loading = false
                        this.login.email = ''
                        this.login.password = ''
                        this.error = e.message
                    })
            } catch (e) {
                this.loading = false
                this.login.email = ''
                this.login.password = ''
                console.log('error', e.message)
            }
        },
        userCreate() {
            this.$router.push('/auth/createUser')
        },
    },
}
</script>

<style></style>
