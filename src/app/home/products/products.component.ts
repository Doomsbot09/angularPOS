import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../shared/services/products/products.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // DECLERATIONS
  show: boolean = false;
  tblID: any = null;
  products: any = [];
  prodType: any = [];
  categories: any = [];
  prodItems: any = [];
  updateCategoryData: any;
  updateItemData: any
  showCategorySelection: string = null;
  userType: any = null;

  constructor(
    private _PS: ProductsService,
    private _US: UserService
  ) { }

  ngOnInit() {
    // GET USER TYPE
    this.userType = this._US.getUser().userType;
    // GET PRODUCT TYPES
    this._PS.getProducts().subscribe((res:any) => {
      this.prodType = res
      console.log(this.prodType)
    });
    // GET CATEGORIES
    this._PS.getCategories().subscribe((res: any) => {
      this.categories = res;
      console.log(this.categories)
    })
    // GET ITEMS
    this._PS.getItems().subscribe((res: any) => {
      this.prodItems = res;
      console.log(this.prodItems);
      res.filter((a) => {
        if(a.productQty <= 20){
          this.getCategories(a)
        }
      })
    })
  }

  // Get method categories to push status if stock is in danger
  getCategories(data){
    // Compare id from categories and id that have low stock from items 
    // If match push key danger that values to 1
    this.categories.filter((a, index, array) => {
      if(a._id == data.categoryID){
        array[index].danger=1
      }
    })
  }

  // LIST CLICK FUNCTION
  selectCategory(data) {
    if(this.tblID == null) {
      this.tblID = data._id
    } else {
      this.tblID = null
    }
  };
  // SELECT PRODUCT TYPE TO ADD CATEGORY
  selectProdType(id){
    this.updateCategoryData = '';
    localStorage.setItem('prodTypeID', id);
    console.log(id)
  }
  // UPDATE CATEGORY
  updateItems(data){
    this.updateItemData = data
  }
  // ADD ITEMS INTO CATEGORY 
  addItems(id){
    this.updateItemData = '';
    localStorage.setItem('categoryID', id)
  }
  // DELETE ITEMS
  deleteItems(data){
    this._PS.deleteItem(data).subscribe((res: any) => {
      console.log(res)
      this.prodItems.filter((a,index,array) => {
        if(a._id == res._id){
          array.splice(index, 1);
        }
      })
    });
  };
  // DELETE CATEGORIES
  btnDeleteCategory(data) {
    this._PS.deleteCategory(data).subscribe((res: any) => {
      this.categories.filter((x,i,a) => {
        if(x._id == res._id){
          a.splice(i, 1);
        }
      })
    })
  };
  // Push product on add
  addedProducts(data){
    console.log(data)
    this.prodType.push(data)
  }
  // Push category on add
  addedCategories(data) {
    console.log(data)
    this.categories.push(data)
  }
  // Push item on add
  addedItems(data) {
    console.log(data);
    this.prodItems.push(data)
  }
  // UPDATED ITEMS
  updatedItems(data) {
    this.prodItems.filter((a,indx,array) => {
      if(a._id == data._id){
        // Find the index from array that matches to pass new data
        array[indx] = data;
      }
    });
  }
  // UPDATED CATEGORY
  updatedCategory(data) {
    this.categories.filter((a,indx,array) => {
      if(a._id == data._id){
        // Find the index from array that matches from param to update current data
        array[indx] = data;
      }
    })
  }
  // SELECT OPTION ON CATEGORIES
  btnSelectOpt(data: string) {
    this.showCategorySelection = data 
  }
  // CANCEL UPDATE OR DELETE CATEGORIES
  cancelUpdDelCategory() {
    this.showCategorySelection = null;
  }
  // UPDATE CATEGORY FUNCTION
  btnUpdateCategory(data) {
    this.updateCategoryData = data
  }

}// END OF CLASS