package meggie

import grails.rest.Resource

@Resource(uri='/payment-record')
class PaymentRecord extends Record {
    float amount
}
