import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  category: FormGroup;
  title: string = "Criar Categoria"

  isUpdating: boolean = false
  currentCategory: Category = {} as Category

  class: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private snackbar: SnackBarComponent
  ) { 
    this.category = this.formBuilder.group({
      nome: '',
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
    this.currentCategory = window.history.state.category as Category
    if (this.currentCategory) {
      this.isUpdating = true
      this.title = `Atualizar Categoria`
      this.category.setValue({
        name: this.currentCategory.nome,
      })
    }
  }

  createCategory() {
    let data = this.category.getRawValue()

    if (this.isUpdating) {
      this.categoryService.update(this.currentCategory.id!, data).toPromise().then((res: any) => {
        this.snackbar.openSnackBar(
          `A categoria foi atualizada.`,
          'Success'
        );
        this.goToForm()
      }).catch((err: any) => {
        this.snackbar.openSnackBar(`Erro, tente novamente mais tarde.`, 'Error');
      })

      this.snackbar.openAfter();
    }
    else {
      this.categoryService.create(data).toPromise().then((res: any) => {
        this.snackbar.openSnackBar(
          `A categoria foi criada.`,
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
    this.router.navigate(['dashboard/category'])
  }

}
