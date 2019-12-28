package meggie

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class DriveHistoryServiceSpec extends Specification {

    DriveHistoryService driveHistoryService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new DriveHistory(...).save(flush: true, failOnError: true)
        //new DriveHistory(...).save(flush: true, failOnError: true)
        //DriveHistory driveHistory = new DriveHistory(...).save(flush: true, failOnError: true)
        //new DriveHistory(...).save(flush: true, failOnError: true)
        //new DriveHistory(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //driveHistory.id
    }

    void "test get"() {
        setupData()

        expect:
        driveHistoryService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<DriveHistory> driveHistoryList = driveHistoryService.list(max: 2, offset: 2)

        then:
        driveHistoryList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        driveHistoryService.count() == 5
    }

    void "test delete"() {
        Long driveHistoryId = setupData()

        expect:
        driveHistoryService.count() == 5

        when:
        driveHistoryService.delete(driveHistoryId)
        sessionFactory.currentSession.flush()

        then:
        driveHistoryService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        DriveHistory driveHistory = new DriveHistory()
        driveHistoryService.save(driveHistory)

        then:
        driveHistory.id != null
    }
}
