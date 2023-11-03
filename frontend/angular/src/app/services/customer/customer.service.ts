import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerDTO} from "../../models/customer-dto";
import {AuthenticationResponse} from "../../models/authentication-response";
import {environment} from "../../../environments/environment";
import {CustomerRegistrationRequest} from "../../models/customer-registration-request";
import {CustomerComponent} from "../../components/customer/customer.component";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly customerUrl = `${environment.api.baseUrl}${environment.api.customerUrl}`;

  constructor(
      private http: HttpClient
  ) { }

  findAll() : Observable<Array<CustomerDTO>>{
     return this.http.get<Array<CustomerDTO>>
    (this.customerUrl);
  }

  registerCustomer(customer : CustomerRegistrationRequest): Observable<void>{
    return this.http.post<void>(this.customerUrl,customer);
  }

  deleteCustomer(id : number | undefined): Observable<void>{
    return this.http.delete<void>(`${this.customerUrl}/${id}`);
  }
}



