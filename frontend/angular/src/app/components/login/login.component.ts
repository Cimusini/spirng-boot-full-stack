import {Component} from '@angular/core';
import {AuthenticationRequest} from "../../models/authentication-request";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    authenticationReq: AuthenticationRequest = {};
    errorMsg= '';

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {
    }

    login() {
      this.errorMsg = '';
        this.authService
            .login(this.authenticationReq)
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
}
