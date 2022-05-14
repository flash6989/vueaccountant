/* eslint-disable */
<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Домашняя бухгалтерия</span>
            <div class="input-field">
                
                <input
                    id="email"
                    type="text"
                    v-model="email"
                    @focus="v$.email.$touch"
                    :class="{invalid: v$.email.$dirty && v$.email.$invalid}"
                >
                <label  for="email">Email</label>
            <small v-if="v$.email.$dirty && this.v$.email.$model.length < 1" class="helper-text invalid">Поле Email не должно быть пустым</small>
            <small v-else-if="v$.email.$dirty && v$.email.$invalid" class="helper-text invalid">Введите корректный Email</small>

            </div>
            <div class="input-field">
                <input
                    id="password"
                    type="password"
                    v-model="password"
                    @focus="v$.password.$touch"
                    :class="{invalid: v$.password.$dirty && v$.password.$invalid}"
                >
             <label for="password">Пароль</label>
            <small v-if="v$.password.$dirty && this.v$.password.$model.length < 1" class="helper-text invalid">Поле пароль не должно быть пустым</small>
            <small v-if="v$.password.$dirty && (this.v$.password.$model.length < 6 && this.v$.password.$model.length >= 1)" class="helper-text invalid">Длина пароля должна быть больше {{v$.password.minLength.$params.min}} знаков. Сейчас {{password.length}}</small>

            </div>
        </div>
        <div class="card-action">
            <div>
            <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
            >
                Войти
                <i class="material-icons right">send</i>
            </button>
            </div>

            <p class="center">
            Нет аккаунта?
            <router-link to="/register">Зарегистрироваться</router-link>
            </p>
        </div>
    </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import messages from '../utils/messages'
import { mapActions } from 'vuex';

export default {
    name: 'login',
    setup () {
      return {
        v$: useVuelidate()
      }
    },
    data () {
      return {
        email: '',
        password: '',
      }
    },
    validations () {
      return {
        email: { email, required },
        password: { required, minLength: minLength(6) },
      }
    },
    methods: {
      ...mapActions(['login']),
      async submitHandler() {
        const isFormCorrect = await this.v$.$validate()
        if(!isFormCorrect) {
          this.v$.$touch(); 
          return
        }
        const formData = {
          email: this.email,
          password: this.password,
        }
        try {
          await this.login(formData)
          this.$router.push('/');

        } catch(e) {}
      

      },
    },
    mounted() {
      if (messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message])
      }
    }
}
</script>