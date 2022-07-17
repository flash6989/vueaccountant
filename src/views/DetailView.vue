<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">
          История
        </router-link>
        <a @click.prevent class="breadcrumb">
          {{record.type === 'income' ? 'Доход' : 'Расход'}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
            'red': record.type === 'outcome',
            'green': record.type === 'income',
          }">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{record.amount + ' ₽'}}</p>
              <p>Категория: {{record.categoryName}}</p>

              <small>
                {{ 
                  new Intl.DateTimeFormat('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  }).format(new Date(record.date))
                }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запись не найдена</p>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      record: null,
      loading: true,
    }
  },
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
    console.log(record, category, 'record, category')
    this.record = {
      ...record,
      categoryName: category.title
    }
    this.loading = false
  }
}
</script>