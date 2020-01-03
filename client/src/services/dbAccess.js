import axios from 'axios'
const DB_DRIVING_RECORDS = 'driving-record'
const DB_LAST_PAID_MILEAGE = 'lastPaidMileage'
const DB_FUEL_RECORD = 'fuel-record'
const ROOT_URL = 'http://localhost:8080/'

export async function addMileageRecord (driver, mileage, distance) {
  let driveSession = {
    driver: driver,
    mileage: mileage,
    distance: distance,
    isPending: true
  }

  await axios.post(ROOT_URL + DB_DRIVING_RECORDS, driveSession)
}

export async function readDriveHistory () {
  let dbHistory = (await axios.get(ROOT_URL + DB_DRIVING_RECORDS)).data
  if (dbHistory !== null) {
    return dbHistory
  } else {
    return []
  }
}

export async function setLastPaidMileage (mileage) {
  await axios.post(ROOT_URL + 'update-' + DB_LAST_PAID_MILEAGE, {
    'lastPaidMileage': mileage.toString()
  })
}

export async function getLastPaidMileage () {
  let lastPaidMileage = (await axios.get(ROOT_URL + DB_LAST_PAID_MILEAGE)).data
  if (lastPaidMileage !== null) {
    return parseInt(lastPaidMileage)
  } else {
    return 0
  }
}

export async function addRefuel (amount, driver, mileage) {
  await axios.post(ROOT_URL + DB_FUEL_RECORD, {
    amount: amount,
    driver: driver,
    isPending: true,
    mileage: mileage
  })
}

export async function getRefuelData () {
  let refuelData = (await axios.get(ROOT_URL + DB_FUEL_RECORD)).data
  if (refuelData !== null) {
    return refuelData
  } else {
    return []
  }
}

export async function clearRefuelData () {
  await axios.post(ROOT_URL + 'update-' + DB_FUEL_RECORD, {
    'refuelData': JSON.stringify([])
  })
}

export async function setRecordsAsPaid (records, driver, type) {
  records.forEach(async record => {
    if (record.driver.id === driver && record.isPending) {
      record.isPending = false
      let id = record.id
      if (type === 'fuelRecord') {
        await axios.put(ROOT_URL + DB_FUEL_RECORD + '/' + id, record)
      } else if (type === 'drivingRecord') {
        await axios.put(ROOT_URL + DB_DRIVING_RECORDS + '/' + id, record)
      }
    }
  })
}

export async function getUsers () {
  let usersAsArray = (await axios.get(ROOT_URL + 'user')).data
  let users = {}
  usersAsArray.forEach(user => {
    users[user.id] = user
  })
  return users
}
