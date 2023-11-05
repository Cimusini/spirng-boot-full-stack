 import {Component, Input} from '@angular/core';
 import {Router} from "@angular/router";
 import {CustomerRegistrationRequest} from "../../models/customer-registration-request";
 import {CustomerService} from "../../services/customer/customer.service";
 import {AuthenticationService} from "../../services/authentication/authentication.service";
 import {AuthenticationRequest} from "../../models/authentication-request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorMsg = '';

  customer: CustomerRegistrationRequest = {};

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private authenticationService: AuthenticationService
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  createAccout() {
    this.customerService.registerCustomer(this.customer)
      .subscribe({
        next: () => {
          const authReq: AuthenticationRequest = {
            username: this.customer.email,
            password: this.customer.password
          };
          this.authenticationService.login(authReq)
            .subscribe({
              next: (authResponse) => {
                localStorage.setItem('user',JSON.stringify(authResponse));
                this.router.navigate(['customers']);
              },
              error: err => {
                if(err.error.stautsCode === 401){
                  this.errorMsg = 'Login and / or password is incorrect.'
                }
              }
            });
        }
      });
  }
}
