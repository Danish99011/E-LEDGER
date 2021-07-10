package tech.getarrays.employeemanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager.exception.UserNotFoundException;
import tech.getarrays.employeemanager.model.Employee;
import tech.getarrays.employeemanager.repo.EmployeeRepo;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {
    //injecting our repository
    private final EmployeeRepo employeeRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    //methods
    //what datatype of data will be returned and what datatype is entered in the parameter like here is written as "Employee"
    public Employee addEmployee(Employee employee)
    {
        //setting employee code to be random
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepo.save(employee);
    }

    public List<Employee> findAllEmployees()
    {
        return employeeRepo.findAll();
    }

    public Employee updateEmployee(Employee employee)
    {
        return employeeRepo.save(employee);
    }

    public Employee findEmployeeById(Long id) throws Throwable {
        return employeeRepo.findEmployeeById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id" + id + "was not found"));
    }

    public void deleteEmployee(Long id)
    {
        employeeRepo.deleteEmployeeById(id);
    }
}
