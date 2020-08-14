import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogvalidatorService } from 'src/app/shared/formvalidators/logvalidator.service';
import { ProductsService } from './../../../shared/services/products/products.service';
import { e } from '@angular/core/src/render3';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  inputs: ['updateCategoryData'],
  outputs: ['addCategory','updateCategory']
})
export class AddCategoryComponent implements OnInit {

  // INPUT
  updateCategoryData: any;

  // OUTPUTS
  addCategory = new EventEmitter;
  updateCategory = new EventEmitter;

  // DECLERATIONS
  addCategoryForms: FormGroup;
  alertMsg: string = null;
  
  // FORMS
  formValidator = {
    'categoryName': {
      'required':'Category name is required.'
    }
  }
  formErrors = {
    'categoryName':''
  }

  constructor(
    private fb: FormBuilder,
    private validationService: LogvalidatorService,
    private _PS: ProductsService
  ) { }

  ngOnInit() {
    // CREATE FORM GROUP ON INIT
    this.addCategoryForms = this.fb.group({
      _id:[''],
      productTypeID: [''],
      categoryName: ['', Validators.required]
    })
    // UPDATE NEW VALUE EVERYTIME FORM CONTROL CHANGES 
    this.addCategoryForms.valueChanges.subscribe(() => this.logValErrors())
  }
  // If there is data emited on changes input it from forms
  ngOnChanges(){
    // Check if theres data to be updated
    if(this.updateCategoryData){
      this.getData(this.updateCategoryData);
    } else{
      // It will only trigger if there is no data to be updated
      if(this.addCategoryForms){
        this.addCategoryForms.reset()
      }
    }
  }

  //LOG VALIDATOR ERROR
  logValErrors(){
     // PASS FORM GROUP FORM VALIDATION MESSAGE AND FORM ERRORS TO LOG VALIDATOR SERVICE
    this.validationService.validatorErrors(this.addCategoryForms, this.formValidator, this.formErrors)
  }
  //SUBMIT FUNCTION
  btnSubmit() {
    // CHECK IF SUBMIT IS UPDATE OR ADD
    if(this.updateCategoryData){
      this._PS.updateCategory(this.addCategoryForms.value).subscribe((res: any) => {
        this.updateCategory.emit(res.data)
        this.alertMsg = res.message
        setTimeout(() => {
          this.alertMsg = null
        }, 2000)
      }, (err: any) => {
        this.alertMsg = err.error;
        setTimeout(() => {
          this.alertMsg = ''
        })
      });
    } else {
      var getProductID = localStorage.getItem('prodTypeID');
      this.addCategoryForms.get('productTypeID').setValue(getProductID);
      
      this._PS.addCategory(this.addCategoryForms.value).subscribe((res: any) => {
        this.addCategory.emit(res.data);

        this.addCategoryForms.reset();
        this.alertMsg = res['message'];
        setTimeout(() => {
          this.alertMsg = null;
        }, 2000)
      }, (err: any) => {
        this.alertMsg = err.error;
        setTimeout(() => {
          this.alertMsg = null;
        }, 2000)
      })
    }
  }
  // CANCEL FUNCTION
  btnCancel() {
    // Reset forms only when there is no data to be updated
    if(!this.updateCategoryData){
      this.addCategoryForms.reset();
    }
    localStorage.removeItem('prodTypeID');
  }
  // INPUT DATA FROM FORMS
  getData(data){
    this.addCategoryForms.get('_id').setValue(data._id);
    this.addCategoryForms.get('categoryName').setValue(data.categoryName);
  }

}
