<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart" v-if="!loading">
      <PieChart :width="400" :height="400" :chartData="chartData"/>
      <!-- <canvas></canvas> -->
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">
      Записей пока нет.
      <router-link to="/record">Добавьте первую</router-link>
    </p>
    <section v-else>
      <HistoryTable :records="records"/>
    </section>
    
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue'
import PieChart from '@/components/PieChart.vue'

export default {
  name: 'history',
  data() {
    return {
      loading: true,
      records: [],
      categories: [],
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            label: 'Расходы по категории',
            data: [40, 20, 80, 10]
          }
        ]
      },
    }
  },
  components: {
    PieChart,
    HistoryTable
  },
  methods: {
    pageChangeHandler() {
      console.log('paginate')
    },
    generateColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
  },
  async mounted() {
    // this.records = await this.$store.dispatch('fetchRecords')

    const records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map((record, idx) => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
        recordNumber: idx + 1,
      }
    }) 
    this.records = this.records.reverse()
    this.chartData.labels = this.categories.map(c => c.title)
    this.chartData.datasets[0].data = this.categories.map(c => {
      return this.records.reduce((total, r) => {
        if(r.categoryId === c.id && r.type ==='outcome') {
          total += +r.amount
        }
        return total
      }, 0)
    })
    this.categories.forEach(() => {
      this.chartData.datasets[0].backgroundColor.push(this.generateColor())
    } )
    this.loading = false;
  }
}
</script>