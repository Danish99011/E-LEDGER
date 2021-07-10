import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';    //used to make http requests to the backend
import { Observable } from 'rxjs';      //uses observables to interact and make services
import { Employee } from './employee';       //calling for employee.ts
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl= environment.apiBaseUrl;

  //injecting http in this service constructor
  constructor(private http: HttpClient) { }


  // making services/methods with return type of "Observable" which is generic(if we type any in generic than it will return anytype)
  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  // here employee :Employee means that we have to type employee and it will add employee of datatype/class/format Employee
  public addEmployees(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`,employee);
  }

  public updateEmployees(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`,employee);
  }

  public deleteEmployees(employeeId: Number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }

}
