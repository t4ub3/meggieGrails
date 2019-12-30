package meggie

import grails.rest.Resource

@Resource(uri='/driving-record')
class DrivingRecord extends Record {
    int distance
    Boolean isPending
}
