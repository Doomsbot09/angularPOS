import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateInput } from '../../../shared/CustomValidator/custom-validator';
import { LogvalidatorService } from 'src/app/shared/formvalidators/logvalidator.service';

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
    private fb: FormBuilder,
    private logValidatorService: LogvalidatorService
  ) { }

  ngOnInit() {
    this.addToCartForm = this.fb.group({
      productQty: [''],
      inputQty: ['', [Validators.required, ValidateInput]]
    });
    // Update new value everytime forms value changes
    this.addToCartForm.valueChanges.subscribe(() => this.logValidators());
  }

  // RESET AND PLACE NEW VALUE EVERYTIME THERE IS CHANGES
  ngOnChanges() {
    // SET VALUE
    if(this.addedToCart != null) {
      this.setValues(this.addedToCart);
      console.log(this.addedToCart)
    }
  }
  // SET VALUES FORM AND VALIDATOR
  setValues(value: any) {
    this.addToCartForm.get('productQty').setValue(value.productQty);
    // SET NEW VALIDATOR
    this.addToCartForm.get('inputQty').setValidators([Validators.required,Validators.max(value.productQty), Validators.min(1), ValidateInput]);
  }
  // LOG VALIDATORS
  logValidators() {
   this.logValidatorService.validatorErrors(this.addToCartForm, this.formValidator, this.formErrors);
  }
  // PUSH INTO CART ARRAY
  btnSubmit() {
    this.submittedProd.emit(this.addToCartForm.value);
    // Get inputed quantity value and reduce it to the current product quantity before resiting
    var qtyOnHand = this.addToCartForm.value.productQty;
    var inputedQty= this.addToCartForm.value.inputQty;
    var newQty    = qtyOnHand - inputedQty;
    // Set new validator for inputQty and new value for quantity on hand
    this.addToCartForm.get('productQty').setValue(newQty)
    this.addToCartForm.get('inputQty').setValidators([Validators.required,Validators.max(newQty), Validators.min(1), ValidateInput]);
    // Clear input after submitted
    this.addToCartForm.get('inputQty').reset();
  }
  // RESET FORM VALUE EVERYTIME USER CANCEL THE ORDER
  onCancel() {
    this.addToCartForm.get('inputQty').reset();
    this.formErrors['inputQty'] = ''
    this.closeModal.emit(this.addToCartForm.value);
  }
}
