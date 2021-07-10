//made to just extract the methods od dealing like save,update which are already made
package tech.getarrays.employeemanager.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.employeemanager.model.Employee;

import java.util.Optional;


public interface EmployeeRepo extends JpaRepository<Employee,Long> {
    //now spring will create an query(using query method) where it will delete-employee-by-id...this is really cool
    void deleteEmployeeById(Long id);

    //Employee findEmployeeById(Long id);  if we know that employee of selected id is present but if not than we use optional as:-
    Optional<Employee> findEmployeeById(Long id);
}
