<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <form @submit.prevent="submitHandler">
        <div class="input-field" >  
          <select v-model="current" ref="select" id="category" select>
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >
              {{c.title}}
            </option>
          </select>
          <label for="category">Выберите категорию</label>
        </div>
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
          Обновить
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
  data() {
    return {
      select: null,
      title: '',
      limit: 100,
      current: null,
    }
  },
  setup () {
    return {
      v$: useVuelidate()
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
    this.select = M.FormSelect.init(this.$refs.select);
  },
  created() {
    const { id, title, limit } = this.categories[0]
    this.current = id;
    this.title = title
    this.limit = limit
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find( c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch() 
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория успешно обновлена')
        this.$emit('updated', categoryData)
      } catch(e) {
        console.log(e)
      }
    }
  },
  props: {
    categories: {
      type: Array,
      required: true,
    }
  },
  onMounted() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>