import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option } from '../common.type';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.css']
})
export class SelectDropdownComponent implements OnInit {
  // Flag to indicate if the textbox is selected
  // ultimately this will make the dropdown visible/hidden
  inputFocused = false;

  @Input('value')
  inputValue = '';
  
  // searched text
  searchValue = '';

  @Output('select')
  changeEvent = new EventEmitter<any>();

  // Text as placeholder in search textbox
  @Input()
  placeholder = '';

  @Input()
  exclude: number[] = [];

  // Options to display in dropdown
  @Input()
  options: Option[] = [];

  constructor() { }

  ngOnInit(): void { }

  onFocus() {
    this.inputFocused = true;
  }

  onSearch(event: any) {
    this.searchValue = event.target.value;
  }

  onBlur() {
    this.inputFocused = false;
  }

  // trigged when an ption is clicked
  onChanged(event: any) {
    console.log(event)
    /* 
      An option cannot store object, it can only store strings, but I am storing { label: '...', value: '...' }
      So I store it as string in JSON format,
      Why is that?
      Because I need to set the string to search textbox same as the selected option, but if store Option.Value in the value of option tag
      we need to re-search the whole array what was the label for the particular, and there can be expection case where 2 options have the same value.

      More explaination:
      <textbox value="a"> <-- say i enter "a"
      <select>
        <option value="1">Apple</option>   <-- say i select apple
        <option value="2">Banana</option> 
      </select>
        
        ||
        ||
      \\  //
        \/

      now the textbox is still "a" but need to make it "Apple" so that it shows what option was selected,
      to achieve that we need to parse the option array and find option having value === 1
      To save the trouble I store the label with value as object and that object as JSON.
    */
    this.onBlur();
    const val = JSON.parse(event.target.value);
    this.changeEvent.emit(val.value);
    // this.inputValue = val.label;
    // console.log(this.inputValue);
  }
}
