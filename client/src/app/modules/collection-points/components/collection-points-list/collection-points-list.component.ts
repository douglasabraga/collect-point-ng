import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { InformationalMessages } from 'src/app/modules/shared/enums/informational-messages.enum';
import { CepPipe } from 'src/app/modules/shared/pipes/cep.pipe';
import { CnpjPipe } from 'src/app/modules/shared/pipes/cnpj.pipe';
import { CollectPoint } from '../../models/collection-points';
import { CollectionPointsService } from '../../services/collection-points.service';
import { CollectPointActionCellComponent } from '../collect-point-action-cell/collect-point-action-cell.component';
import { CollectionPointsFormComponent } from '../collection-points-form/collection-points-form.component';

@Component({
  selector: 'app-collection-points-list',
  templateUrl: './collection-points-list.component.html',
  styleUrls: ['./collection-points-list.component.scss']
})
export class CollectionPointsListComponent implements OnInit {
  
  collectionPointsList: CollectPoint[] = []
  tableCollectionPointsConfig: Object = {}

  dialogRef: NbDialogRef<CollectionPointsFormComponent>

  constructor(
    private collectionPointsService: CollectionPointsService,
    private dialogService: NbDialogService,
    private toasterService: NbToastrService,
    private datePipe: DatePipe,
    private cnpjPipe: CnpjPipe,
    private cepPipe: CepPipe
    ) { }

  ngOnInit(): void {
    this.setConfigTableCollectionPoints()
    this.doSearchCollectionPoints()
  }

  doSearchCollectionPoints() {
    this.collectionPointsService.getCollectionPoints().subscribe({
      next: next => {
        this.collectionPointsList = next
      },
      error: error => {
        console.error(error);
        this.toasterService.warning(InformationalMessages.GENERIC_ERROR, 'Atenção')
      }
    })
  }

  showDialog() {
    this.dialogRef = this.dialogService.open(CollectionPointsFormComponent, {
      context: {
        collectionPoint: Object.assign({}),
        edit: false
      },
      hasScroll: true,
      closeOnEsc: false,
      closeOnBackdropClick: false,
    })
    this.dialogRef.onClose.subscribe({
      next: (next: boolean) => {
        if (next) this.doSearchCollectionPoints()
      }
    })
  }

  setConfigTableCollectionPoints() {
    this.tableCollectionPointsConfig = {
      actions: {
        columnTitle: "Ação",
        add: false,
        edit: false,
        delete: false,
        position: 'right'
      },
      noDataMessage: InformationalMessages.NOT_FOUND,
      columns: {
        description: {
          title: 'Descrição',
          valuePrepareFunction: (cell: string, row: CollectPoint) =>{
						if(row.tradingName) return row.tradingName
            return row.companyName
            
					}
        },
        cnpj: {
          title: 'CNPJ',
          valuePrepareFunction: (cell: string) =>{
            return this.cnpjPipe.transform(cell)
					}
        },
        zipCode: {
          title: 'CEP',
          valuePrepareFunction: (cell: string) =>{
            return this.cepPipe.transform(cell)
					}
        },
        contryState: {
          title: 'Cidade/Estado',
          valuePrepareFunction: (cell: string, row: CollectPoint) =>{
						let concatCityState = `${row.city}/${row.state}` 
            return concatCityState
					}
        },
        registrationDate: {
          title: 'Data Cadastro',
          valuePrepareFunction: (cell: string) =>{
            if(!cell) return cell
						let parsedDate = new Date(cell)
            return this.datePipe.transform(parsedDate,'dd/MM/yyyy HH:mm')
					}
        },
        action: {
          title: 'Ação',
          filter: false,
          type: 'custom',
          renderComponent: CollectPointActionCellComponent,
          onComponentInitFunction: this.onComponentInitFunction
        }
      }
    }
  }
  onComponentInitFunction(instance: CollectPointActionCellComponent) {
    let teste:any
    instance.edit.subscribe({
      next: (next: boolean) => {teste = next}
    })
  }
}