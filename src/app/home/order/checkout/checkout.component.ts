import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  inputs: ['cartItems','totalItems','newInput'],
  outputs: ['receipt','clearList']
})
export class CheckoutComponent implements OnInit {
  // INPUT FROM PARENT
  cartItems: any;
  totalItems: any;
  newInput: string;
  // OUTPUT RECEIPT
  receipt = new EventEmitter;
  clearList = new EventEmitter;
  // DECLARATION
  checkOutForm: FormGroup;
  discountValue: any;
  // FORMS
  formValidation = {
    "cash" : {
      'required':'Please input cash value.',
      'min':'Cash must not be less than to subtotal.'
    }
  }
  formErrors = {
    'cash':''
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.checkOutForm = this.fb.group({
      illiteracy: [''],
      total: [''],
      discount: [''],
      cash: ['', Validators.required]
    })
  }
  ngOnChanges() {
    if(this.newInput == null){
    } else {
      setTimeout(() => {
        this.checkOutForm.get('illiteracy').setValue('')
        this.checkOutForm.get('cash').setValue('')
      },1000)
    }

    if(this.cartItems && this.totalItems){
      const total = this.totalItems;
      const ckForm = this.checkOutForm
        ckForm.get('total').setValue(total);
        ckForm.get('cash').setValidators([Validators.required, Validators.min(total)])
    }
  }

  // LOG VALIDATOR
  logValidator(group: FormGroup = this.checkOutForm) {
    Object.keys(group.controls).forEach((key) => {
      const absCtrl = group.get(key);
      this.formErrors[key] = ''
      if(absCtrl && absCtrl.invalid && (absCtrl.touched || absCtrl.dirty || absCtrl.value !=='')){
        const message = this.formValidation[key];
        for(const errKey in absCtrl.errors){
          if(errKey) {
            this.formErrors[key] = message[errKey];
          }
        }
      } 
    })
  }
  // ON SUBMIT FUNCTION
  btnSubmit() {
    this.receipt.emit(this.checkOutForm.value)
    this.clearList.emit()
    this.newInput = ''
  }
  // ON CANCEL FUNCTION
  onCancel() {

  }
  // DISCOUNT
  changeTotal() {
    const getDiscountStat = this.checkOutForm.value.illiteracy;
    if(getDiscountStat == '1') {
      const total = this.totalItems;
      const getDiscount = total * 0.05;
      this.discountValue = getDiscount;
      const discount = total - getDiscount;
      this.totalItems = '';
      this.totalItems = discount;
      this.checkOutForm.get('discount').setValue(getDiscount);
      this.checkOutForm.get('cash').setValidators([Validators.required, Validators.min(discount)])
    } else {
      this.totalItems = this.totalItems + this.discountValue;
      this.checkOutForm.get('discount').setValue('');
      this.checkOutForm.get('cash').setValidators([Validators.required, Validators.min(this.totalItems)])
    }
  }
}
