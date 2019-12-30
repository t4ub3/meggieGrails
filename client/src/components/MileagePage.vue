<template>
    <div class="overlay_background">
        <div class="overlay" @click.stop>
            <overlay-header :text="'Neuer km-Stand'"></overlay-header>
            <div class="overlay_body">
                <div class="text">Wer ist zuletzt gefahren?</div>
                <template v-for="user in users">
                  <input :key="'input' + user.id" class="text" :id="`radio-${user.id}`" name="radio-driven-last" type="radio" :value="user.id" v-model.number="driver"/>
                  <label :key="'label' + user.id" class="text" :for="`radio-${user.id}`">{{ user.name }}</label>
                </template>
                <br><br>
                <label class="text" for="input-mileage">aktueller Kilometerstand:</label>
                <input class="text" id="input-mileage" type="number" v-model.number="mileage"/>
                <br><br>
                <button class="button" @click="submitRecord">{{submitButtonText}}</button>
            </div>
        </div>
    </div>
</template>

<script>
import {addMileageRecord} from '../services/dbAccess.js'
import OverlayHeader from './OverlayHeader'

export default {
  name: 'MileagePage',
  components: {OverlayHeader},

  props: {
    drivingHistory: Array,
    users: Object
  },

  data () {
    return {
      driver: 2,
      mileage: 0,
      oldMileage: 0,
      submitButtonText: 'Absenden'
    }
  },

  created () {
    if (this.drivingHistory.length > 0) {
      this.mileage = this.oldMileage = this.drivingHistory[this.drivingHistory.length - 1].mileage
    } else {
      this.mileage = this.oldMileage = 0
    }
  },

  methods: {
    async submitRecord () {
      if (this.oldMileage <= this.mileage) {
        this.submitButtonText = 'Speichere ...'
        let distance = this.mileage - this.oldMileage
        await addMileageRecord(this.driver, this.mileage, distance)
        this.$emit('close')
      } else {
        alert('Bitte gib einen gültigen km-Stand an!')
      }
    }
  }
}
</script>
