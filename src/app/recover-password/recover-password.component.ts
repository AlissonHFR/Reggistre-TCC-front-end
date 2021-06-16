import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarComponent } from '../snack-bar/snack-bar.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  recoverPassword: FormGroup;
  title: string = "Recuperar Conta"

  class: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private snackbar: SnackBarComponent
  ) { 
    this.recoverPassword = this.formBuilder.group({
      email: '',
    })
  }

  ngOnInit(): void {
  }

  onResize(event: any) {
    if (event.target.innerWidth < 600) {
      this.class = "mat-elevation-z0"
    } else {
      this.class = ''
    }
  }

  recoverPasswordUser() {
    let data = this.recoverPassword.getRawValue()


      //TODO

      this.snackbar.openAfter();
    
  }

  goToForm() {
    this.router.navigate([''])
  }

}
