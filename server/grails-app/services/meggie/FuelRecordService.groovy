package meggie

import grails.gorm.services.Service

@Service(FuelRecord)
interface FuelRecordService {
    FuelRecord save(User driver, int mileage, Date date, float amount, Boolean isPending)
}