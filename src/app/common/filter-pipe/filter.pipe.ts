import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: { label: string, value: any }[], search: string): { label: string, value: any }[] {
    return value.filter((option) => {
      return option.label.toLowerCase().includes(search.toLowerCase());
    })
  }

}
