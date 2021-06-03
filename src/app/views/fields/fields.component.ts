import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
} from '@angular/forms';
import { DialogButton } from '../../shared/interfaces/dialog-config.interface';
import { ApiService } from '../../shared/services/api.service';


type ServiceOption = { service: ApiService, dataKey?: string, idKey?: string };
type OptionType = string[] | ServiceOption | undefined;
@Component({
  selector: 'fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class FieldsComponent implements OnInit {

  required = false;
  @Input() public label = '';
  @Input() public type = 'text';
  @Input() public name = '';
  @Input() public placeHolder: string = '';

  @Input() public button?: boolean = false;
  @Input() public buttonData?: DialogButton = {} as DialogButton;

  @Input() public isNormalField: boolean = false;
  @Input() public isDatePicker: boolean = false;

  @Input() public isSelect: boolean = false;
  @Input() public isAutoComplete: boolean = false;

  @Input() public options?: OptionType

  @Input() public isMultipleOptions: boolean = false;

  @Output() fieldButtonEvent = new EventEmitter()

  values: any[] = []
  allValues: string[] = []
  loading: boolean = true
  match: boolean = true

  constructor(private form: FormGroupDirective) {
  }

  ngOnInit() {
    if (!this.isNormalField && !this.isSelect && !this.isDatePicker && !this.isAutoComplete) {
      throw 'Select one type of field: normalField, selectField or datePicker';
    }
    const fieldTypes = [this.isNormalField, this.isSelect, this.isDatePicker, this.isAutoComplete]
    let duplicatedTrues = fieldTypes.some(
      (val, i) => {
        if (val) {
          return fieldTypes.indexOf(val) !== i
        } else {
          return false
        }
      }
    );
    if (duplicatedTrues) {
      throw 'Select only one type of field: normalField, selectField or datePicker';
    }

    if (this.isServiceOptions(this.options)) {
      this.options.dataKey ? '' : this.options.dataKey = 'name'
      this.options.idKey ? '' : this.options.idKey = 'id'

      this.options.service.readAll().toPromise().then((res: any) => {
        this.loading = false
        this.values = res
        this.allValues = res
      })
    } else {
      this.loading = false
      this.values = this.options!
    }
  }

  filter(e: any) {
    if (!this.isServiceOptions(this.options)) {
      this.match = true
      this.values = this.options!.filter((value: any) =>
        value.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1);
      if (!this.values.length) this.match = false
    }
  }

  objFilter(e: any) {
    if (this.isServiceOptions(this.options)) {
      this.match = true
      const val = this.options.dataKey!
      this.values = this.allValues.filter((value: any) =>
        value[val].toLowerCase().indexOf(e.target.value.toLowerCase()) != -1);
      if (!this.values.length) this.match = false
    }
  }

  isServiceOptions(options: OptionType): options is ServiceOption {
    return typeof options === 'object' && options !== null && (options as ServiceOption).service !== undefined;
  }

  displayFn = (value: any): string => {
    if (this.isServiceOptions(this.options) && value != '') {
      const val = this.options!
      let res: any = this.allValues.find((e: any) => e[val.idKey!] == value)!
      return res[val.dataKey!]
    }
    else {
      return value
    }
  }

  fieldButtonClick(e: any) {
    this.fieldButtonEvent.emit(e)
  }

}

