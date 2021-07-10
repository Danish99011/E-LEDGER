import { HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// we implement OnInit so that we can call our method of getEmployee and its result(which is employees/Employee[]) directly to the app.component.html file
export class AppComponent implements OnInit{

  //we made this variable because it will hold all employee data coming from the backend
  public employees: Employee[] = [];
  public editEmployee!: Employee ;
  public deleteEmployee!: Employee;

  // now we are injecting service here to get its access
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  // mirroring methods: here we get observable type as return hence we need subscribe to get notified if kuch bhi return ho from the backend even it be the requested data or an error
  public getEmployees():void {
    this.employeeService.getEmployees().subscribe(
      (Response: Employee[]) => {
        this.employees = Response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // linking the made forms to the database
  public onAddEmployee(addForm:NgForm):void{

    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployees(addForm.value).subscribe(
      (response:Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public searchEmployees(key:string):void{
    const results: Employee[] = [];
    for(const employee of this.employees) {
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if(results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public onUpdateEmployee(employee:Employee):void{
    this.employeeService.updateEmployees(employee).subscribe(
      (response:Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId:Number):void{
    this.employeeService.deleteEmployees(employeeId).subscribe(
      (response:void) => {
        console.log(response);
        this.getEmployees();            //call getemployees again to reload everything
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  // whenever we open model...or click on button what will happen is decided here...employee is one jispe koi function perform hoga and mode is kis modal ko open krna...add,delete etc
  public onOpenModal(employee: Employee,mode:string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'; //we dont need button to show....we already have them
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if(mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    if(mode === 'delete'){
      this.deleteEmployee = employee;  //jo employee passed delet that
      button.setAttribute('data-target','#deleteEmployeeModal');
    }

    container.appendChild(button);
    button.click();
    }

}
