import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from './../../../shared/services/products/products.service';
import { LogvalidatorService } from 'src/app/shared/formvalidators/logvalidator.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
  outputs: ['addProduct']
})
export class AddProductsComponent implements OnInit {
  
  // OUTPUTS
  addProduct = new EventEmitter

  // DECLERATIONS
  addProductForms: FormGroup;
  alertMsg: string = null;
  serverErrKey: any;
  // FORMS
  formValidation = {
    'productType': {
      'required': 'Product type is required.'
    }
  };
  formErrors = {
    'productType':''
  }

  constructor(
    private fb: FormBuilder,
    private _PS: ProductsService,
    private logValidatorService: LogvalidatorService
  ) { }

  ngOnInit() {
    // CREATE FORM ON INIT
    this.addProductForms = this.fb.group({
      productType: ['', Validators.required]
    });
    // UPDATE NEW VALUE EVERYTIME FORM CONTROL CHANGES
    this.addProductForms.valueChanges.subscribe(() =>  this.logValErrors() );
  }
  // ON LOG VALIDATIONS
  logValErrors(){
    // PASS FORM GROUP, VALIDATION MESSAGE AND FORM ERRORS TO SERVICE
    this.logValidatorService.validatorErrors(this.addProductForms, this.formValidation, this.formErrors);
  }
  // ON SUBMIT FUNCTION
  btnSubmit() {
    this._PS.addProducts(this.addProductForms.value).subscribe((res: any) => {
      this.addProduct.emit(res.data)
      this.addProductForms.reset();
      this.alertMsg = res.message
      setTimeout(() => {
        this.alertMsg = null
      }, 2000)
    }, (err: any) => {
      this.alertMsg = err.error
      setTimeout(() => {
        this.alertMsg = null
      }, 2000)
    })
  };
  // CANCEL FUNCTION
  btnCancel() {
    this.addProductForms.reset();
    Object.keys(this.formErrors).forEach((key) => {
      this.formErrors[key] = ''
    })
  }

}
