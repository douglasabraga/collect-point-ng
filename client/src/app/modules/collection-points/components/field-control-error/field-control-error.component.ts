import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationalMessages } from 'src/app/modules/shared/enums/informational-messages.enum';

@Component({
  selector: 'app-field-control-error',
  templateUrl: './field-control-error.component.html',
  styleUrls: ['./field-control-error.component.scss']
})
export class FieldControlErrorComponent implements OnInit {

  @Input() control: FormGroup
  @Input() label: string

  constructor() { }

  ngOnInit(): void {
  }

  buildError(){
    const input = this.control.get(this.label)

    if(input && input?.errors && !this.control?.pristine && input?.touched) {
      if(input?.errors['required']){
        return InformationalMessages.REQUIRED_FIELD
      }
      if(input.errors['invalidCnpj']){
        console.log(input.errors['invalidCnpj'])
        return 'CNPJ inválido'
      }
    }
  }

}
