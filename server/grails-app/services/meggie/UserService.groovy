package meggie

import grails.gorm.services.Service

@Service(User)
interface UserService {
    User save(String name, String username, String password)
}