package meggie

import grails.rest.Resource

@Resource(uri='/driving-record')
class DrivingRecord {
    String driver
    int mileage
    int distance
}
