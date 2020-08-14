import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProfit'
})
export class FilterProfitPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    const Profit = []
    value.filter(a => {
      Profit.push(a.profit)
    })
    if(Profit.length < 1){
      return Profit
    } else {
      let x = Profit.reduce((a,b) => { return a + b })
      if(x * 10 % 2 == 0) {
        return (x + '.00')
      } else {
        return x
      }
    }
  }

}
