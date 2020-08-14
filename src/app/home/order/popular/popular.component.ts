import { Component, OnInit, EventEmitter } from '@angular/core';
import { ProductsService } from './../../../shared/services/products/products.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css'],
  inputs: ['allItems'],
  outputs: ['selectedPopItem']
})

export class PopularComponent implements OnInit {

  // INPUTS
  allItems: any[];

  // OUTPUTS
  selectedPopItem = new EventEmitter

  // DECLERATIONS
  itemList: any = [];

  constructor(
    private _PS: ProductsService
  ) { }

  ngOnInit() {
    // Get General Sales
    this._PS.getSales().subscribe((res: any) => {
      // Group all product that have the same id
      res.filter((item,index) => {
        // Find the item that have the same itemID and return the index of the item
        var unique = res.findIndex(x => x.itemID === item.itemID)
        // Push all unique item in itemList
        if(unique == index) {
          this.itemList.push(item)
        }
        // Get all duplicates
        else {
          // Find the id of duplicates in itemList and return the index
          var duplicated = this.itemList.findIndex(gen => gen.itemID === item.itemID);
          // Merge all quantity that equals to the index of duplicates
          this.itemList[duplicated].Quantity += item.Quantity
        }
      });
      // Sort the highest quantity of item and filter top 1 to 10 to grade the stars
      this.itemList.sort((a,b) => a.Quantity > b.Quantity ? -1 : 0).filter((a,index) => {
        // Push stars that equivalent to the grade of item
        var array = []
        for(var i=10; index < i; i--){
          array.push("fa fa-star")
        }
        // Push empty stars for those item that grade less than 10
        for(var y=10; array.length < y;){
          array.push("fa fa-star-o")
        }
        a.stars = array;
      });
    });
  }

  // SELECT ITEM
  selectItem(data: any){
    this.allItems.filter(a => {
      if(a._id === data){
       this.selectedPopItem.emit(a)
      }
    })
  }

}
