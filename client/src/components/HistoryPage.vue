<template>
    <div class="box">
        <table class="table">
            <tr class="row" v-for="drivingRecord in drivingHistoryReverse" :key="drivingRecord.mileage">
                <td>{{ formatDate(drivingRecord.date) }}</td>
                <td class="column">-</td>
                <td class="column leftColumn">{{ drivingRecord.mileage }} km</td>
                <td class="column">-</td>
                <td class="column rightColumn">{{ users[drivingRecord.driver.id].name }}</td>
            </tr>
        </table>
    </div>
</template>

<script>

export default {
  name: 'HistoryPage',

  props: {
    drivingHistory: Array,
    users: Object
  },

  computed: {
    drivingHistoryReverse () {
      return [...this.drivingHistory].reverse()
    }
  },
  methods: {
    formatDate (date) {
      let newDate = new Date(date)
      return newDate.getDate() + '.' + (newDate.getMonth() + 1) + '.' + newDate.getFullYear()
    }
  }
}
</script>

<style scoped>
    .table {
        margin: 0 auto;
        border-collapse: collapse;
    }
    .row:not(:last-child) .column {
        border-bottom: 1px solid darkgray;
    }
    .column {
        padding: 8px;
    }
    .leftColumn {
        padding-left: 16px;
        text-align: right;
    }
    .rightColumn {
        padding-right: 16px;
        text-align: left;
    }
</style>
