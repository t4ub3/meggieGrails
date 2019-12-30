package meggie

import grails.gorm.services.Service

@Service(DrivingRecord)
interface DrivingRecordService {
    DrivingRecord save(User driver, int mileage, Date date, int distance, Boolean isPending)
}