import { Component } from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {AuthenticationResponse} from "../../models/authentication-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {

  constructor(
    private router: Router
  ) {
  }

  items: Array<MenuItem> =[
    {
      label: 'Profile',
      icon: 'pi pi-user'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog'
    },
    {
      separator: true
    },
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      command: () => {
        localStorage.clear();
        this.router.navigate(['login']);
      }
    }
  ];

  get username(): string{
    const storedUser = localStorage.getItem('user');
    if(storedUser) {
      const authResponde: AuthenticationResponse = JSON.parse(storedUser);
      if(authResponde && authResponde.customerDTO && authResponde.customerDTO.username) {
        return authResponde.customerDTO.username;
      }
    }
    return '--';
  }

  get userRole(): string{
    const storedUser = localStorage.getItem('user');
    if(storedUser) {
      const authResponde: AuthenticationResponse = JSON.parse(storedUser);
      if(authResponde && authResponde.customerDTO && authResponde.customerDTO.roles) {
        return authResponde.customerDTO.roles[0];
      }
    }
    return '--';
  }

}
