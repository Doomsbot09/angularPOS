import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {

    if(!value)return null;
    if(!args)return value;

    if(value.length != 0) {
      let x = value.filter((item) => {
          return JSON.stringify(item.productName).toLowerCase().includes(args);
      });

      if(x.length == 0) {
        return value = [{msg: "Product not found"}]
      } else {
        return x
      }
    } 
}

}
