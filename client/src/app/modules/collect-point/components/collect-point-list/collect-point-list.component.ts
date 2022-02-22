import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { finalize } from 'rxjs';
import { InformationalMessages } from 'src/app/modules/shared/enums/informational-messages.enum';
import { CnpjPipe } from 'src/app/modules/shared/pipes/cnpj.pipe';
import { ZipCodePipe } from 'src/app/modules/shared/pipes/zip-code.pipe';
import { CollectPoint } from '../../models/collect-point';
import { CollectionPointsService } from '../../services/collect-point.service';
import { CollectPointActionCellComponent } from '../collect-point-action-cell/collect-point-action-cell.component';
import { CollectPointFormComponent } from '../collect-point-form/collect-point-form.component';

@Component({
  selector: 'app-collect-point-list',
  templateUrl: './collect-point-list.component.html',
  styleUrls: ['./collect-point-list.component.scss']
})
export class CollectPointListComponent implements OnInit {
  
  collectionPointsList: LocalDataSource = new LocalDataSource([])
  tableCollectionPointsConfig: Object = {}
  loading: boolean
  dialogRef: NbDialogRef<CollectPointFormComponent>
  formFilter: FormGroup

  constructor(
    private collectionPointsService: CollectionPointsService,
    private dialogService: NbDialogService,
    private toasterService: NbToastrService,
    private datePipe: DatePipe,
    private cnpjPipe: CnpjPipe,
    private zipCodePipe: ZipCodePipe,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.setConfigTableCollectionPoints()
    this.initializeForm()
  }

  initializeForm(): void {
		this.formFilter = this.formBuilder.group({
			cnpj: [''],
			companyName: [''],
      tradingName: ['']
		})
	}
    
  doSearchCollectionPoints() {
    this.loading = true
    this.collectionPointsService.getCollectPointsByFilter(
      this.formFilter.get('cnpj')?.value,
      this.formFilter.get('companyName')?.value,
      this.formFilter.get('tradingName')?.value
    )
    .pipe(
      finalize(() => this.loading = false)
    )
    .subscribe({
      next: next => this.collectionPointsList = new LocalDataSource(next),
      error: error => {
        console.error(error)
        this.toasterService.warning(InformationalMessages.GENERIC_ERROR, 'Atenção')
      }
    })
  }

  showDialog() {
    this.dialogRef = this.dialogService.open(CollectPointFormComponent, {
      context: {
        collectionPoint: Object.assign({}),
        edit: false
      },
      closeOnEsc: false,
      closeOnBackdropClick: false
    })
    this.dialogRef.onClose.subscribe(
        isToSearch => isToSearch && this.doSearchCollectionPoints()
    )
  }

  setConfigTableCollectionPoints() {
    this.tableCollectionPointsConfig = {
      actions: false,
      noDataMessage: InformationalMessages.NOT_FOUND,
      columns: {
        description: {
          title: 'Descrição',
          filter: false,
          valuePrepareFunction: (cell: string, row: CollectPoint) => {
						if(row.tradingName) return row.tradingName
            return row.companyName
					}
        },
        cnpj: {
          title: 'CNPJ',
          filter: false,
          valuePrepareFunction: (cell: string) => this.cnpjPipe.transform(cell)
        },
        zipCode: {
          title: 'CEP',
          filter: false,
          valuePrepareFunction: (cell: string) => this.zipCodePipe.transform(cell)
        },
        contryState: {
          title: 'Cidade/Estado',
          filter: false,
          valuePrepareFunction: (cell: string, row: CollectPoint) => {
						let concatCityState = `${row.city}/${row.state}` 
            return concatCityState
					}
        },
        registrationDate: {
          title: 'Data Cadastro',
          filter: false,
          valuePrepareFunction: (cell: string) => {
            if(!cell) return cell
						let parsedDate = new Date(cell)
            return this.datePipe.transform(parsedDate,'dd/MM/yyyy HH:mm')
					}
        },
        action: {
          filter: false,
          type: 'custom',
          renderComponent: CollectPointActionCellComponent,
          onComponentInitFunction: this.onComponentInitFunction.bind(this)
        }
      }
    }
  }

  onComponentInitFunction(instance: CollectPointActionCellComponent) {
    instance.isToSearch.subscribe(
      isToSearch => isToSearch && this.doSearchCollectionPoints()
    )
  }
}