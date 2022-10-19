import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, param:string): any {
    let filtered:any[] = []    
    if(!param.length) return value
    value.forEach((item:any) => {      
      if(item.name.includes(param))
         filtered.push(item)
    })
    return filtered
  }
}
