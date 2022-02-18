import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ZipCode } from 'src/app/modules/shared/models/zip-code';
import { ZipCodeService } from 'src/app/modules/shared/services/zipCode.service';
import { Validations } from 'src/app/modules/shared/validators/validations';
import { CollectionPoints } from '../../models/collection-points';
import { CollectionPointsService } from '../../services/collection-points.service';

@Component({
  selector: 'app-collection-points-form',
  templateUrl: './collection-points-form.component.html',
  styleUrls: ['./collection-points-form.component.scss']
})
export class CollectionPointsFormComponent implements OnInit {
  collectionPoint: CollectionPoints
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private collectionPointsService: CollectionPointsService,
    private zipCodeService: ZipCodeService,
    private collectionPointDialogRef: NbDialogRef<CollectionPointsFormComponent>,
    private toasterService: NbToastrService 
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cnpj: ['', [Validators.required, Validations.ValidatorCnpj]],
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

  createCollectionPoint(): void {
    console.log(this.form)

    if (this.form.invalid) {
      this.setFormInvalid()
      return
    }

    const collectionPoint: CollectionPoints = {
      ...this.form.value,
      registrationDate: this.getCurrentDate()
    }

    console.log(collectionPoint)

    this.collectionPointsService.addCollectionPoint(collectionPoint).subscribe({
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

  getCurrentDate(): Date {
    return new Date()
  }

  getZipCode(): void {
    let zipCode = this.form.get('zipCode')?.value
    
    if(!zipCode) return
    
    const validZipCode = /^[0-9]{8}$/

    if (validZipCode.test(zipCode)) {
      this.zipCodeService.getStatusZipCode(zipCode).subscribe({
        next: (next: ZipCode) => {
          console.log(next)
          this.addStatusZipCodeForm(next)
        },
        error: error => {
          this.toasterService.danger('Falha ao preencher o CEP!', 'Atenção: Preenchimento automático')
          console.error(error)
        }
      })
    }
  }

  addStatusZipCodeForm(zipCodeStatus: ZipCode): void {
    this.form.patchValue({
      street: zipCodeStatus.logradouro,
      neighborhood: zipCodeStatus.bairro,
      state: zipCodeStatus.uf,
      city: zipCodeStatus.localidade
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
