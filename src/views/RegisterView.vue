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
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            @focus="v$.name.$touch"
            :class="{invalid: v$.name.$dirty && v$.name.$invalid}"
        >
        <label for="name">Имя</label>
        <small 
        class="helper-text invalid"
        v-if="v$.name.$dirty && this.v$.name.$invalid"
        >
          Введите ваше имя
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { mapActions } from 'vuex';

export default {
  name: 'register',
  setup () {
      return {
        v$: useVuelidate()
      }
    },
  data () {
      return {
        email: '',
        password: '',
        name: '',
        agree: false,
      }
    },
    validations () {
      return {
        email: { email, required },
        password: { required, minLength: minLength(6) },
        name: { required },
        agree: { checked: v => v},
      }
    },
     methods: {
      ...mapActions(['register']),
      async submitHandler() {
        const isFormCorrect = await this.v$.$validate()
        if(!isFormCorrect) {
          this.v$.$touch(); 
          return
        }
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name,
        }
        try{ 
          await this.register(formData)
          this.$router.push('/');
        } catch(e) {}
      
      },
    },
}
</script>