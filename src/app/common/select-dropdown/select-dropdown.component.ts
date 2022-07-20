import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option } from '../common.type';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.css']
})
export class SelectDropdownComponent implements OnInit {
  inputFocused = false;
  inputValue = '';
  selectedValue = '';

  @Output('select')
  changeEvent = new EventEmitter<any>();

  @Input()
  placeholder = '';

  @Input()
  options: Option[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onFocus() {
    this.inputFocused = true;
  }

  onBlur() {
    this.inputFocused = false;
  }

  onChanged() {
    const val = JSON.parse(this.selectedValue);
    this.inputValue = val.label;
    this.changeEvent.emit(val.value);
    this.onBlur();
  }
}
