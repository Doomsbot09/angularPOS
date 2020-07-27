import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateInput } from '../../../shared/CustomValidator/custom-validator';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css'],
  inputs: ['addedToCart'],
  outputs: ['submittedProd','closeModal']
})
export class AddToCartComponent implements OnInit {
  // INPUT FROM PARENT
  addedToCart: any;
  clearInput: boolean = false;
  submitForm: boolean = false;
  // OUTPUT DATA
  submittedProd = new EventEmitter;
  closeModal = new EventEmitter;
  // DECLERATIONS
  addToCartForm: FormGroup
  quantity: number;
  NUMERIC_PATTREN = '0-9';

  // VALIDATOR
  formValidator = {
    'inputQty': {
      'required': 'Please input quantity.',
      'max': 'Quantity must not be greater than quantity on hands.',
      'min': 'Quantity must not be less than 1.',
      'InvalidInput': 'Input whole number only.'
    }
  }
  formErrors = {
    'inputQty':''
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.addToCartForm = this.fb.group({
      id: [''],
      prodName: [''],
      prodPrice: [''],
      prodQty: [''],
      inputQty: ['', [Validators.required, ValidateInput]]
    })
  }

  // RESET AND PLACE NEW VALUE EVERYTIME THERE IS CHANGES
  ngOnChanges() {
    // SET VALUE
    if(this.addedToCart != null) {
      this.setValues(this.addedToCart);
    }
  }
  // SET VALUES FORM AND VALIDATOR
  setValues(value: any) {
    this.addToCartForm.get('id').setValue(value.id);
    this.addToCartForm.get('prodName').setValue(value.prodName);
    this.addToCartForm.get('prodQty').setValue(value.qty);
    this.addToCartForm.get('prodPrice').setValue(value.price);
    // SET NEW VALIDATOR
    this.addToCartForm.get('inputQty').setValidators([Validators.required,Validators.max(value.qty), Validators.min(1), ValidateInput]);
  }
  // LOG VALIDATORS
  logValidators(group: FormGroup = this.addToCartForm) {
    Object.keys(group.controls).forEach((key) => {
      const absCtrl = group.get(key);
      this.formErrors[key] = ''
      if(absCtrl && absCtrl.invalid && (absCtrl.touched)) {
        const message = this.formValidator[key]
        for(const errKey in absCtrl.errors){
          if(errKey) {
            this.formErrors[key] = message[errKey]
            console.log(errKey)
          }
        }
      } 
    })
  }
  // PUSH INTO CART ARRAY
  btnSubmit() {
    this.submittedProd.emit(this.addToCartForm.value);
    this.addToCartForm.get('inputQty').reset();
  }
  // RESET FORM VALUE EVERYTIME USER CANCEL THE ORDER
  onCancel() {
    this.addToCartForm.get('inputQty').reset();
    this.formErrors['inputQty'] = ''
    this.closeModal.emit(this.addToCartForm.value);
  }
}
