import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogButton } from '../shared/interfaces/dialog-config.interface';
import { Movement } from '../shared/interfaces/movement.interface';
import { TableConfig } from '../shared/interfaces/table.interface';
import { MovementService } from '../shared/services/movement.service';
import { TableService } from '../shared/services/table.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.service';
import { DialogComponent } from '../views/dialog/dialog.component';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {

  tableConfig: TableConfig = {} as TableConfig;
  selectedMovement: Movement = {} as Movement

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private movementService: MovementService,
    private tableService: TableService,
    private snackbar: SnackBarComponent
  ) {

    this.tableConfig = {
      columnsAndData: [
        { column: 'NOME', dataKey: 'nome' },
        { column: 'TIPO', dataKey: 'tipo' },
        { column: 'CATEGORIA', dataKey: 'category' },
        { column: 'VALOR', dataKey: 'valor' },
      ],
      button: [
        { column: 'AÇÕES', btnData: [{ btnText: 'icon-edit' }, { btnText: 'icon-clear', btnColor: 'warn' }] },
      ],
      addButton: true,
      service: movementService
    };
  }

  async openDialog(message: string, title: string, buttonsData?: DialogButton[]): Promise<any> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '24%',
      height: '20%',
      data: { message: message, title: title, buttons: buttonsData }
    });

    dialogRef.afterClosed().subscribe((e: any) => {
      if (e == 'Delete') {
        this.deleteMovement(this.selectedMovement.id!)
      }
    })

    await dialogRef.afterClosed().toPromise()
  }

  ngOnInit(): void {
  }

  async OnApplyFilter($event: any) {
    if ($event.from == "icon-clear") {
      this.selectedMovement = $event.data
      this.deleteMovementDialog($event.data)
    }
    else if ($event == "add") {
      this.router.navigate(['dashboard/movement/new'])
    }
    else if ($event.from == "icon-edit") {
      this.router.navigateByUrl('dashboard/movement/new', { state: { movement: $event.data } })
    }
  }

  deleteMovementDialog(data: any) {
    this.openDialog(`Tem certeza que deseja deletar esta movimentação?`, 'Warning!', [{ text: 'Cancel', color: 'primary' }, { text: 'Delete', color: 'warn' }])
  }

  deleteMovement(id: number) {
    this.movementService.delete(id).toPromise().then((res: any) => {
      this.snackbar.openSnackBar(
        `A movimentação foi deletada com sucesso`,
        'Success'
      );
      this.tableService.refresh()
    }).catch((err: any) => {
      this.snackbar.openSnackBar(`Erro, tente novamente mais tarde.`, 'Error');
    })
    this.snackbar.openAfter();
  }

}
