import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceFilter'
})
export class ReduceFilterPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
   const subTotal = []
    value.filter(a => {
      subTotal.push(a.subTotal)
    })

    if(subTotal.length < 1) {
     return subTotal
    } else {
      let x = subTotal.reduce((a,b) => { return a + b })
      if(x * 10 % 2 == 0) {
        return (x + '.00')
      } else {
        return x
      }
    }
  }

}
