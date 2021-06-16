import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from '../shared/interfaces/category.interface';
import { DialogButton } from '../shared/interfaces/dialog-config.interface';
import { TableConfig } from '../shared/interfaces/table.interface';
import { CategoryService } from '../shared/services/category.service';
import { TableService } from '../shared/services/table.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.service';
import { DialogComponent } from '../views/dialog/dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  selectedCategory: Category = {} as Category
  tableConfig: TableConfig = {} as TableConfig;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private router: Router,
    private tableService: TableService,
    private snackbar: SnackBarComponent
  ) { 
    this.tableConfig = {
      columnsAndData: [
        { column: 'NOME', dataKey: 'nome' },
      ],
      button: [
        { column: 'AÇÕES', btnData: [{ btnText: 'icon-edit' }, { btnText: 'icon-clear', btnColor: 'warn' }] },
      ],
      addButton: true,
      service: categoryService
    };
  }

  async openDialog(message: string, title: string, buttonsData?: DialogButton[]): Promise<any> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '24%',
      height: '20%',
      data: { message: message, title: title, buttons: buttonsData }
    });

    dialogRef.afterClosed().subscribe((e: any) => {
      if (e == 'Deletar') {
        this.deleteCategory(this.selectedCategory.id!)
      }
    })

    await dialogRef.afterClosed().toPromise()
  }

  async OnApplyFilter($event: any) {
    if ($event.from == "icon-clear") {
      this.selectedCategory = $event.data
      this.deleteCategoryDialog($event.data)
    }
    else if ($event == "add") {
      this.router.navigate(['dashboard/category/new'])
    }
    else if ($event.from == "icon-edit") {
      this.router.navigateByUrl('dashboard/category/new', { state: { category: $event.data } })
    }
  }

  deleteCategoryDialog(data: any) {
    this.openDialog(`Você tem certeza que deseja remover a categoria?`, 'Atenção!', [{ text: 'Cancelar', color: 'primary' }, { text: 'Deletar', color: 'warn' }])
  }

  deleteCategory(id: number) {
    this.categoryService.delete(id).toPromise().then((res: any) => {
      this.snackbar.openSnackBar(
        `A categoria foi removida.`,
        'Success'
      );
      this.tableService.refresh()
    }).catch((err: any) => {
      this.snackbar.openSnackBar(`Erro, tente novamente mais tarde.`, 'Error');
    })
    this.snackbar.openAfter();
  }

}
