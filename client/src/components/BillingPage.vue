<template>
    <div class="overlay_background">
        <div class="overlay" @click.stop>
            <overlay-header :text="'Abrechnung'"></overlay-header>
            <div class="overlay_body">
                <!-- <div class="text">Zuletzt bezahlt bei {{lastPaidMileage}} km.</div> -->
                <template v-for="user in users">
                  <input :key="'input' + user.id"
                         class="text"
                         :id="`radio-${user.id}`"
                         name="radio-driven-last"
                         type="radio"
                         :value="user.id"
                         v-model.number="driver"/>
                  <label :key="'label' + user.id" class="text" :for="`radio-${user.id}`">{{ user.name }}</label>
                </template>
                <br><br>
                <div class="text">
                    Ich habe
                    <br>
                    bei
                    <input id="input-refuel-mileage" type="number" v-model.number="refuelMileage">
                    km für
                    <br>
                    <input id="input-refuel-amount" type="number" step="0.01" v-model.number="refuelAmount"/> €
                    <br>
                    getankt.
                </div>
                <button class="button" @click="refuelHandler">Verrechnen</button>
                <br>
                <br>
                <div class="text">aktuelle Kosten: {{ costs }} €</div>
                <button class="button" @click="payedHandler">{{ submitButtonText }}</button>
            </div>
        </div>
    </div>

</template>

<script>
import {setLastPaidMileage, addRefuel, getRefuelData, setRecordsAsPaid} from '../services/dbAccess.js'
import OverlayHeader from './OverlayHeader'

export default {
  name: 'BillingPage',

  components: {OverlayHeader},

  props: {
    drivingHistory: Array,
    users: Object
  },

  data () {
    return {
      driver: 0,
      refuelData: [],
      refuelAmount: 0,
      refuelMileage: 0,
      submitButtonText: 'Ich habe bezahlt',
      recompute: false
    }
  },

  computed: {
    costs () {
      let dummy = this.recompute // eslint-disable-line no-unused-vars
      let billedMileage = this.drivingHistory.reduce((currentSum, drivingRecord) => {
        if (drivingRecord.driver.id === this.driver && drivingRecord.isPending) {
          return currentSum + drivingRecord.distance
        }
        return currentSum
      }, 0)
      let summedRefuelValue = this.refuelData.reduce((currentRefuelSum, fuelRecord) => {
        if (fuelRecord.driver.id === this.driver && fuelRecord.isPending) {
          return currentRefuelSum + fuelRecord.amount
        }
        return currentRefuelSum
      }, 0)
      return parseFloat(Math.round(100 * (billedMileage * 0.25 - summedRefuelValue)) / 100).toFixed(2)
    }
  },

  methods: {
    async setMileageAsPaid () {
      let lastPaidMileage = this.drivingHistory[this.drivingHistory.length - 1].mileage
      await setLastPaidMileage(lastPaidMileage)
      this.lastPaidMileage = lastPaidMileage // Wert aktualisieren, ohne neu aus LS zu laden
    },

    async refuelHandler () {
      await addRefuel(this.refuelAmount, this.driver, this.refuelMileage)
      this.refuelData = await getRefuelData()
    },

    async payedHandler () {
      this.submitButtonText = 'Speichere ...'
      await setRecordsAsPaid(this.drivingHistory, this.driver, 'drivingRecord')
      await setRecordsAsPaid(this.refuelData, this.driver, 'fuelRecord')
      this.recompute = !this.recompute
      this.$emit('close')
    }
  },

  async created () {
    this.refuelData = await getRefuelData()
  }
}
</script>
