import { Pipe, PipeTransform } from '@angular/core';
import { Option } from '../common.type';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Option[], search: string): Option[] {
    return value.filter((option) => {
      return option.label.toLowerCase().includes(search.toLowerCase());
    })
  }

}
