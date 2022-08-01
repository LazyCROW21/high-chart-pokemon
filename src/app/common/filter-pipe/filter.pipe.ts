import { Pipe, PipeTransform } from '@angular/core';
import { Option } from '../common.type';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Option[], search: string, exclude: number[]): Option[] {
    const excludeSet = new Set<number>(exclude);
    return value.filter((option) => {
      if(excludeSet.has(option.value)) {
        return false;
      }
      return option.label.toLowerCase().includes(search.toLowerCase());
    })
  }

}
