import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ZipCode } from 'src/app/modules/shared/models/zip-code';
import { ZipCodeService } from 'src/app/modules/shared/services/zipCode.service';
import { Validations } from 'src/app/modules/shared/validators/validations';
import { CollectPoint } from '../../models/collection-points';
import { CollectionPointsService } from '../../services/collection-points.service';

@Component({
  selector: 'app-collection-points-form',
  templateUrl: './collection-points-form.component.html',
  styleUrls: ['./collection-points-form.component.scss']
})
export class CollectionPointsFormComponent implements OnInit {
  collectionPoint: CollectPoint
  form: FormGroup
  edit: boolean

  labelAction: string

  constructor(
    private formBuilder: FormBuilder,
    private collectionPointsService: CollectionPointsService,
    private zipCodeService: ZipCodeService,
    private collectionPointDialogRef: NbDialogRef<CollectionPointsFormComponent>,
    private toasterService: NbToastrService 
  ) { }

  ngOnInit(): void {
    this.initializeLabelAction()
    this.initializeForm(this.collectionPoint)
  }

  initializeForm(collectPoint: CollectPoint): void {
    this.form = this.formBuilder.group({
      cnpj: [collectPoint.cnpj, [Validators.required, Validations.ValidatorCnpj]],
      companyName: [collectPoint.companyName, [Validators.required]],
      tradingName: [collectPoint.tradingName],
      stateRegister: [collectPoint.stateRegister, [Validators.required]],
      zipCode: [collectPoint.zipCode, [Validators.required]],
      street: [collectPoint.street, [Validators.required]],
      number: [collectPoint.number],
      neighborhood: [collectPoint.neighborhood, [Validators.required]],
      city: [collectPoint.city, [Validators.required]],
      state: [collectPoint.state, [Validators.required, Validators.maxLength(2)]],
      addressComplement: [collectPoint.addressComplement],
    })
  }

  initializeLabelAction():void {
    this.labelAction = this.edit ? 'Editar' : 'Inserir'
  }

  saveCollectionPoint(): void {

    console.log(this.form)

    if (this.form.invalid) {
      this.setFormInvalid()
      return
    }

    this.edit ? this.editCollectionPoint() : this.createCollectionPoint()
  }

  createCollectionPoint(): void {
    const newCollectionPoint: CollectPoint = {
      ...this.form.value,
      id: this.collectionPoint.id,
      registrationDate: this.getCurrentDate()
    }

    this.collectionPointsService.addCollectionPoint(newCollectionPoint).subscribe({
      next: next => {
        console.log(next)
        this.toasterService.success('Ponto de coleta inserido com sucesso!', 'Sucesso')
        this.closeDialog(true)
      },
      error: error => {
        console.error(error);
        this.toasterService.warning('Ocorreu um erro inesperado!', 'Atenção')
      }
    })
  }

  editCollectionPoint():void {
    const changeCollectionPoint: CollectPoint = {
      ...this.form.value,
      id: this.collectionPoint.id,
      registrationDate: this.collectionPoint.registrationDate,
      updateDate: this.getCurrentDate()
    }

    this.collectionPointsService.editCollectionPoint(changeCollectionPoint).subscribe({
      next: next => {
        console.log(next)
        this.toasterService.success('Ponto de coleta alterado com sucesso!', 'Sucesso')
        this.closeDialog(true)
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
    Object.keys(this.form.controls).forEach(el => {
      const control = this.form.get(el)
      control?.markAsTouched()
    })
  }

  isValidTouch(field: AbstractControl): boolean {
    return field.getError('required') && field.touched
  }

  closeDialog(action: boolean): void {
    this.collectionPointDialogRef.close(action);
  }
}
