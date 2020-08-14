import { Component, OnInit } from '@angular/core';
import { UserService } from './../../shared/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // DECLERATION
  userType: any = null;

  constructor(
    private _US: UserService,
    private rt: Router
  ) { }

  ngOnInit() {
    // Get the usertype of user to check if it is admin or staff
    this.userType = this._US.getUser().userType;
  }

  // Remove all localStorage upon log-out
  logOut() {
    localStorage.clear();
    this.rt.navigate(['sign-in']);
  }
}
