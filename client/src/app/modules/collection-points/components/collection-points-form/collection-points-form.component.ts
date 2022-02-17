import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { CollectionPoints } from '../../models/collection-points';
import { CollectionPointsService } from '../../services/collection-points.service';

@Component({
  selector: 'app-collection-points-form',
  templateUrl: './collection-points-form.component.html',
  styleUrls: ['./collection-points-form.component.scss']
})
export class CollectionPointsFormComponent implements OnInit {
  collectionPoint: CollectionPoints
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private collectionPointsService: CollectionPointsService,
    private collectionPointDialogRef: NbDialogRef<CollectionPointsFormComponent>,
    private toasterService: NbToastrService 
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cnpj: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      tradingName: [''],
      stateRegister: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: [''],
      neighborhood: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required, Validators.maxLength(2)]],
      addressComplement: [''],
    })
  }

  createCollectionPoint() {
    console.log(this.form)

    if (this.form.invalid) {
      this.setFormInvalid()
      return;
    }

    this.collectionPointsService.addCollectionPoint(this.form.value).subscribe({
      next: next => {
        console.log(next)
        this.toasterService.success('Ponto de coleta inserido com sucesso!', 'Sucesso')
        this.collectionPointDialogRef.close()
      },
      error: error => {
        console.error(error);
        this.toasterService.warning('Ocorreu um erro inesperado!', 'Atenção')
      }
    })
  }

  setFormInvalid(): void {
    this.toasterService.danger('Verifique se foram preenchidos ou se estão no formato adequado!', 'Atenção: Existem campos inválidos')
    this.form.get('cnpj')?.markAsTouched()
    this.form.get('companyName')?.markAsTouched()
    this.form.get('stateRegister')?.markAsTouched()
    this.form.get('zipCode')?.markAsTouched()
    this.form.get('street')?.markAsTouched()
    this.form.get('neighborhood')?.markAsTouched()
    this.form.get('city')?.markAsTouched()
    this.form.get('state')?.markAsTouched()
  }

  closeDialog(): void {
    this.collectionPointDialogRef.close();
  }
}
