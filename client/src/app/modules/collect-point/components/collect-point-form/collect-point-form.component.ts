import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { InformationalMessages } from 'src/app/modules/shared/enums/informational-messages.enum';
import { ZipCode } from 'src/app/modules/shared/models/zip-code';
import { ZipCodeService } from 'src/app/modules/shared/services/zipCode.service';
import { Validations } from 'src/app/modules/shared/validators/validations';
import { CollectPoint } from '../../models/collect-point';
import { CollectionPointsService } from '../../services/collect-point.service';

@Component({
	selector: 'app-collect-point-form',
	templateUrl: './collect-point-form.component.html',
	styleUrls: ['./collect-point-form.component.scss']
})
export class CollectPointFormComponent implements OnInit {
	collectionPoint: CollectPoint
	form: FormGroup
	edit: boolean
	labelAction: string

	constructor(
		private formBuilder: FormBuilder,
		private collectionPointsService: CollectionPointsService,
		private zipCodeService: ZipCodeService,
		private collectionPointDialogRef: NbDialogRef<CollectPointFormComponent>,
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
			addressComplement: [collectPoint.addressComplement]
		})
	}

	initializeLabelAction(): void {
		this.labelAction = this.edit ? 'Editar' : 'Inserir'
	}

	saveCollectionPoint(): void {
		if (this.form.invalid) {
			this.form.markAsDirty()
			this.markAsTouched(this.form)
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

		this.collectionPointsService.addCollectPoint(newCollectionPoint).subscribe({
			next: () => {
				this.toasterService.success(InformationalMessages.SUCCESSFUL_INSERTING, 'Sucesso')
				this.closeDialog(true)
			},
			error: error => {
				console.error(error)
				this.toasterService.warning(InformationalMessages.NOT_FOUND, 'Atenção')
			}
		})
	}

	editCollectionPoint(): void {
		const changeCollectionPoint: CollectPoint = {
			...this.form.value,
			id: this.collectionPoint.id,
			registrationDate: this.collectionPoint.registrationDate,
			updateDate: this.getCurrentDate()
		}

		this.collectionPointsService.editCollectPoint(changeCollectionPoint).subscribe({
			next: () => {
				this.toasterService.success(InformationalMessages.SUCCESSFUL_EDITING, 'Sucesso')
				this.closeDialog(true)
			},
			error: error => {
				console.error(error)
				this.toasterService.warning(InformationalMessages.NOT_FOUND, 'Atenção')
			}
		})
	}

	getCurrentDate(): Date {
		return new Date()
	}

	getZipCode(): void {
		let zipCode = this.form.get('zipCode')?.value

		if (!zipCode) return

		const validZipCode = /^[0-9]{8}$/

		if (validZipCode.test(zipCode)) {
			this.zipCodeService.getStatusZipCode(zipCode).subscribe({
				next: zipCode => this.addStatusZipCodeForm(zipCode),
				error: error => {
					this.toasterService.warning(InformationalMessages.NOT_FOUND, 'Atenção')
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

	markAsTouched(form: FormGroup | FormArray | any): void {
		if (!form) return

		Object.keys(form.controls).forEach((key: string) => {
			const abstractControl = form.controls[key]

			if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
				this.markAsTouched(abstractControl)
			} else {
				abstractControl.markAsTouched()
			}
		})
	}

	isValidTouch(field: AbstractControl): boolean {
		return field.getError('required') && field.touched
	}

	closeDialog(action: boolean): void {
		this.collectionPointDialogRef.close(action)
	}
}
