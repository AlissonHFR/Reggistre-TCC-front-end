import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/interfaces/user.interface';
import { UserService } from '../shared/services/user.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  title: string = "Criar Usuário"

  currentUser: User = {} as User

  user: FormGroup;

  class: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private userService: UserService,
    private snackbar: SnackBarComponent
  ) { 
    this.user = this.formBuilder.group({
      nomeCompleto: '',
      nomeUsuario: '',
      senha: '',
      email: '',
      emailAlternativo: '',
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
  }

  createUser() {
    let data = this.user.getRawValue()

    for (const property in data) {
      const d = data[property];
      if (d == null || d == undefined || d === '') {
        delete data[property];
      }
    }
    this.userService.create(data).toPromise().then((res: any) => {
      this.snackbar.openSnackBar(
        `O usuário foi criado com sucesso`,
        'Success'
      );
      this.goToForm()
    }).catch((err: any) => {
      this.snackbar.openSnackBar(`Erro, tente novamente mais tarde.`, 'Error');
    })

    this.snackbar.openAfter();
  }


  goToForm() {
    this.router.navigate([''])
  }

}
