package meggie

import grails.gorm.services.Service

@Service(PaymentRecord)
interface PaymentRecordService {
    PaymentRecord save(User driver, int mileage, Date date, float amount)
}