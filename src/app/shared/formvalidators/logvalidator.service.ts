import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LogvalidatorService {

  constructor() { }

  validatorErrors(group: FormGroup, formValidators: Object, formErrors: any){
    Object.keys(group.controls).forEach((key) => {
      const absCtrl = group.get(key);
      formErrors[key] = '';

      if(absCtrl && absCtrl.invalid && (absCtrl.touched || absCtrl.dirty)){
        const message = formValidators[key];
        
        for(const errKey in absCtrl.errors){
          if(errKey){
            formErrors[key] = message[errKey];
          }
        }

      }

    if(absCtrl instanceof FormGroup){
      this.validatorErrors(absCtrl, formValidators, formErrors);
    }

    if(absCtrl instanceof FormArray){
      for(const control of absCtrl.controls){
        if(control instanceof FormGroup){
          this.validatorErrors(control, formValidators, formErrors)
        }
      }
    }

    })
  }

}
