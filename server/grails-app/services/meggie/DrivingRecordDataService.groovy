package meggie

import grails.gorm.services.Service

@Service(DrivingRecord)
interface DrivingRecordDataService {
    DrivingRecord save(String driver, int mileage, int distance)
}