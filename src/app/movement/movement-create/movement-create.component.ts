import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movement } from 'src/app/shared/interfaces/movement.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { MovementService } from 'src/app/shared/services/movement.service';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.service';

@Component({
  selector: 'app-movement-create',
  templateUrl: './movement-create.component.html',
  styleUrls: ['./movement-create.component.css']
})
export class MovementCreateComponent implements OnInit {

  title: string = "Criar Movimentação"

  isUpdating: boolean = false
  currentMovement: Movement = {} as Movement

  movement: FormGroup;

  class: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private movementService: MovementService,
    public categoryService: CategoryService,
    private snackbar: SnackBarComponent
  ) {
    this.movement = this.formBuilder.group({
      nome: '',
      descricao: '',
      data: '',
      tipoMovimentacao: '',
      valor: '',
      categoriaId: '',
    })
  }

  onResize(event: any) {
    if (event.target.innerWidth < 600) {
      this.class = "mat-elevation-z0"
    } else {
      this.class = ''
    }
  }

  ngOnInit(): void {
    this.currentMovement = window.history.state.movement as Movement
    if (this.currentMovement) {
      this.movement.setValue({
        nome: this.currentMovement.nome,
        descricao: this.currentMovement.descricao,
        data: this.currentMovement.data,
        tipoMovimentacao: this.currentMovement.tipoMovimentacao,
        valor: this.currentMovement.valor,
        categoriaId: this.currentMovement.categoriaId,
      })
      this.isUpdating = true
      this.title = `Atualizar '${this.currentMovement.nome}`
    }
  }

  createMovement() {
    let data = this.movement.getRawValue()

    for (const property in data) {
      const d = data[property];
      if (d == null || d == undefined || d === '') {
        delete data[property];
      }
    }

    if (this.isUpdating) {
      this.movementService.update(this.currentMovement.id!, data).toPromise().then((res: any) => {
        this.snackbar.openSnackBar(
          `A movimentação foi atualizada`,
          'Success'
        );
        this.goToForm()
      }).catch((err: any) => {
        this.snackbar.openSnackBar(`Erro, tente novamente mais tarde.`, 'Error');
      })

      this.snackbar.openAfter();
    }
    else {
      this.movementService.create(data).toPromise().then((res: any) => {
        this.snackbar.openSnackBar(
          `Foi criada uma nova movimentação`,
          'Success'
        );
        this.goToForm()
      }).catch((err: any) => {
        this.snackbar.openSnackBar(`Erro, tente novamente mais tarde.`, 'Error');
      })

      this.snackbar.openAfter();
    }
  }

  goToForm() {
    this.router.navigate(['dashboard/movement'])
  }


}
