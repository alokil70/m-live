<template>
    <div class="flex">
        <form class="form">
            <h1 class="form__title">Заголовок</h1>
            <div class="form__groups">
                <div
                    class="form__group"
                    :class="{ 'form-group--error': $v.name.$error }"
                >
                    <label class="form__label">Логин</label>
                    <input
                        v-model.trim="name"
                        class="form__input"
                        @input="setName($event.target.value)"
                    />
                </div>
                <div v-if="!$v.name.required" class="error">
                    Field is required
                </div>
                <div v-if="!$v.name.minLength" class="error">
                    Name must have at least
                    {{ $v.name.$params.minLength.min }} letters.
                </div>
                <div
                    class="form-group"
                    :class="{ 'form-group--error': $v.age.$error }"
                >
                    <label class="form__label">Age</label>
                    <input
                        class="form__input"
                        :value="age"
                        @change="setAge($event.target.value)"
                    />
                </div>
                <div v-if="!$v.age.between" class="error">
                    Must be between {{ $v.age.$params.between.min }} and
                    {{ $v.age.$params.between.max }}
                </div>
                <span tabindex="0">Blur to see changes</span>
            </div>
            <button class="form__button">Войти</button>
        </form>

        <form class="form">
            <h1 class="form__title">Заголовок</h1>
            <div class="form__groups">
                <div
                    class="form__group"
                    :class="{ 'form-group--error': $v.name.$error }"
                >
                    <label class="form__label">Логин</label>
                    <input
                        v-model.trim="name"
                        class="form__input"
                        @input="setName($event.target.value)"
                    />
                </div>
                <div v-if="!$v.name.required" class="error">
                    Field is required
                </div>
                <div v-if="!$v.name.minLength" class="error">
                    Name must have at least
                    {{ $v.name.$params.minLength.min }} letters.
                </div>
                <div
                    class="form-group"
                    :class="{ 'form-group--error': $v.age.$error }"
                >
                    <label class="form__label">Age</label>
                    <input
                        class="form__input"
                        :value="age"
                        @change="setAge($event.target.value)"
                    />
                </div>
                <div v-if="!$v.age.between" class="error">
                    Must be between {{ $v.age.$params.between.min }} and
                    {{ $v.age.$params.between.max }}
                </div>
                <span tabindex="0">Blur to see changes</span>
            </div>
            <button class="form__button">Войти</button>
        </form>
    </div>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'

import MInput from '@/components/form/m-input'

export default {
    name: 'MForm',
    components: { MInput },
    data() {
        return {
            name: '',
            age: 0,
            aaaa: '',
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(4),
        },
        age: {
            between: between(20, 30),
        },
    },

    methods: {
        setName(value) {
            this.name = value
            this.$v.name.$touch()
        },
        setAge(value) {
            this.age = value
            this.$v.age.$touch()
        },
    },
}
</script>

<style scoped></style>
