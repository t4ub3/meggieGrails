package meggie

class BootStrap {
    DrivingRecordDataService drivingRecordDataService

    def init = { servletContext ->
        drivingRecordDataService.save("Neumann", 1, 1)
        drivingRecordDataService.save("Stoffel", 2, 1)
    }
    def destroy = {
    }
}
