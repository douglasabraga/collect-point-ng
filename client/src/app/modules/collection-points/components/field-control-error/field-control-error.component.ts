import { Component, Input, OnInit } from '@angular/core';
import { InformationalMessages } from 'src/app/modules/shared/enums/informational-messages.enum';

@Component({
  selector: 'app-field-control-error',
  templateUrl: './field-control-error.component.html',
  styleUrls: ['./field-control-error.component.scss']
})
export class FieldControlErrorComponent implements OnInit {

  @Input() showErrorMessage: boolean
  @Input() errorMessage: string

  constructor() { }

  ngOnInit(): void {
    if(!this.errorMessage) this.errorMessage = InformationalMessages.REQUIRED_FIELD
  }

}
