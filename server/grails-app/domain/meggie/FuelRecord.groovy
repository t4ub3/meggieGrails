package meggie

import grails.rest.Resource

@Resource(uri='/fuel-record')
class FuelRecord extends Record {
    float amount
    Boolean isPending
}
