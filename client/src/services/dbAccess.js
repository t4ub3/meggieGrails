import axios from 'axios'
const DB_DRIVING_RECORDS = 'driving-record'
const DB_LAST_PAID_MILEAGE = 'lastPaidMileage'
const DB_REFUEL_DATA = 'refuelData'
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

export async function addRefuel (newRefuel) {
  let refuelData = await getRefuelData()
  refuelData.push(parseFloat(newRefuel))
  await axios.post(ROOT_URL + 'update-' + DB_REFUEL_DATA, {
    'refuelData': JSON.stringify(refuelData)
  })
}

export async function getRefuelData () {
  let refuelData = (await axios.get(ROOT_URL + DB_REFUEL_DATA)).data
  if (refuelData !== null) {
    return JSON.parse(refuelData)
  } else {
    return []
  }
}

export async function clearRefuelData () {
  await axios.post(ROOT_URL + 'update-' + DB_REFUEL_DATA, {
    'refuelData': JSON.stringify([])
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
