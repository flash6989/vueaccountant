<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
          <h4>Создать</h4>
      </div>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
            <input
                id="name"
                type="text"
                v-model="title"
                @focus="v$.title.$touch"
                :class="{invalid: v$.title.$dirty && !v$.title.$model}"
            >
            <label for="name">Название</label>
            <span 
                v-if="v$.title.$dirty && !v$.title.$model"
                class="helper-text invalid"
                
            >
                Введите название категории
            </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              @focus="v$.limit.$touch"
              :class="{invalid: v$.limit.$dirty && v$.limit.$model < v$.limit.minValue.$params.min}"
          >
          <label for="limit">Лимит</label>
          <span v-if="v$.limit.$dirty && v$.limit.$model < v$.limit.minValue.$params.min" class="helper-text invalid">Минимальная величина {{v$.limit.minValue.$params.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';

export default {
    setup () {
      return {
        v$: useVuelidate()
      }
    },
    data() {
        return{
          title: '',
          limit: 100,
        }
    },
    validations () {
      return {
        title: { required },
        limit: { minValue: minValue(100) },
      }
    },
    mounted() {
        window.M.updateTextFields()
    },
    methods: {
        async submitHandler() {
            if(this.v$.$invalid){
                this.v$.$touch(); 
                return
            }
            try{
              const category = await this.$store.dispatch('createCategory', {
                title: this.title,
                limit: this.limit,
            })
            console.log(this.v$)
                this.title = ''
                this.limit = this.v$.limit.minValue.$params.min
                this.v$.$reset()
                this.$message('Категория была создана')
                this.$emit('created', category)
                console.log(category, 'front')
            } catch (e) {}
        }
    }
}
</script>