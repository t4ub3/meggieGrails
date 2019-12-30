package meggie

class BootStrap {
    DrivingRecordService drivingRecordService
    FuelRecordService fuelRecordService
    PaymentRecordService paymentRecordService
    UserService userService

    def init = { servletContext ->
        // def neumann = userService.save("Neumann", "neumann", "neumann")
        // def stoffel = userService.save("Stoffel", "stoffel", "stoffel")
        // drivingRecordService.save(neumann, 100, new Date(), 10, false)
        // drivingRecordService.save(stoffel, 150, new Date(), 50, false)
        // drivingRecordService.save(neumann, 200, new Date(), 50, true)
        // drivingRecordService.save(stoffel, 250, new Date(), 50, true)
        // fuelRecordService.save(stoffel, 220, new Date(), 40.0, true)
        // paymentRecordService.save(stoffel, 150, new Date(), 60.0)
    }
    def destroy = {
    }
}
