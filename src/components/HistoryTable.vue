<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record) of records" :key="record.id">
      <td>{{record.recordNumber}}</td>
      <td>{{record.amount + ' ₽'}}</td>
      <td>
        {{ new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(new Date(record.date))
        }}</td>
      <td>{{record.categoryName}}</td>
      <td>
        <span 
          :class="[record.typeClass]"
          class="white-text badge"
        >{{ record.typeText }}</span>
      </td>
      <td>
        <button 
          class="btn-small btn"
          @click="$router.push('/detail/' + record.id)"
          v-tooltip="'Открыть подробную информацию'"
          data-position="top"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array,
    }
  }
}
</script>