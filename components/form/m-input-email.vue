<template>
    <div class="m-input">
        <label :for="id" :class="{ error }" class="spacing-2">{{
            label
        }}</label>
        <input
            :id="id"
            :value="value"
            class="form-control"
            :placeholder="placeholder"
            autofocus="autofocus"
            autocomplete="off"
            :type="type"
            :class="{ error }"
            @input="input($event.target.value)"
        />
        <span v-if="!$v.value.required" class="error"
            >Поле обязательно для заполнения</span
        >
        <span v-if="!$v.value.email && error" class="error"
            >Email заполнен некорректно</span
        >
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
    name: 'MInputEmail',
    validations: {
        value: {
            email,
            required,
        },
    },
    props: {
        id: {
            type: String,
            default: 'input',
        },
        label: {
            type: String,
            default: null,
        },
        placeholder: {
            type: String,
            default: null,
        },
        infoMessage: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'email',
        },
        value: {
            type: [String, Number],
            default: '',
        },
    },
    data: () => ({
        submitStatus: null,
    }),
    computed: {
        error() {
            return this.$v.value.$error
        },
    },
    methods: {
        input(value) {
            this.$v.value.$touch()
            this.$emit('input', value)
            if (this.$v.value.$error) {
                if (!this.$v.value.minLength) {
                    this.submitStatus = 'мало'
                    this.error = !this.$v.value.minLength
                    console.log('min')
                    return
                }
                if (!this.$v.value.required) {
                    this.submitStatus = 'Поле обязательно для заполнения'
                    this.error = !this.$v.value.required
                    console.log('required')
                    return
                }
                if (this.$v.$invalid) {
                    this.submitStatus = 'Поле заполнено некорректно'
                    this.error = true
                } else {
                    // do your submit logic here
                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500)
                }
            }
        },
    },
}
</script>
