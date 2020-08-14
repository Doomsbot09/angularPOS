import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  // DECLERATION
  time: number = 5;

  constructor(
    private rt: Router
  ) { }

  ngOnInit() {
    setInterval(() => {
      this.time -= 1
    }, 1000)
    setTimeout(() => { 
      this.rt.navigate(['sign-in']);
      localStorage.clear();
    }, 5000);
  }

}
