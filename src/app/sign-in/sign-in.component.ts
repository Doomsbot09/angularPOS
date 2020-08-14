import { Component, OnInit } from '@angular/core';
import { LogvalidatorService } from '../shared/formvalidators/logvalidator.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  // DECLERATIONS
  alertMsg: string = null;
  // FORMS
  signInForm: FormGroup
  formValidationMsg = {
    'username': {
      'required':'Username is required.'
    },
    'password': {
      'required':'Password is required.'
    }
  }
  formErrors = {
    'username':'',
    'password':''
  }

  constructor(
    private fb: FormBuilder,
    private logValidationService: LogvalidatorService,
    private _US: UserService,
    private rt: Router
  ) { }

  ngOnInit() {
    // CREATE FORMS ON INIT
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // UPDATE NEW VALUE EVERYTIME FORM CONTROL CHANGES
    this.signInForm.valueChanges.subscribe(() => this.logValErrors())
  }
  // LOG VALIDATION
  logValErrors() {
    // // PASS FORM GROUP, VALIDATION MESSAGE AND FORM ERRORS TO SERVICE
    this.logValidationService.validatorErrors(this.signInForm, this.formValidationMsg, this.formErrors);
  }

  // SIGN IN
  btnSignIn() {
    this._US.authenticate(this.signInForm.value).subscribe((res: any) => {
      this._US.setToken(res.token);
      this._US.setUser(res.data);
      if(res.data.userType === 'Admin') {
        this.rt.navigate(['home/sales']);
      } else {
        this.rt.navigate(['home/products']);
      }
    }, (err: any) => {
      if(err.status == 0){
        this.alertMsg = 'Server is not running'
        setTimeout(() => {
          this.alertMsg = null;
        }, 2000)
      } else {
        this.alertMsg = err.error.message
        setTimeout(() => {
          this.alertMsg = null;
        }, 2000)
      }
    })
  };

}
