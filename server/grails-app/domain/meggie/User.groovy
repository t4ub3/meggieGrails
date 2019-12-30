package meggie

import grails.rest.Resource

@Resource(uri='/user')
class User {
    String name
    String username
    String password
    static hasMany = [drivingRecord: DrivingRecord, fuelRecord: FuelRecord, paymentRecord: PaymentRecord]
}
