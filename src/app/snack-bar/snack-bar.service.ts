import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from './notifier/notifier.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarComponent {
  timer = 80;

  constructor(private snackbar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    return this.snackbar.openFromComponent(NotifierComponent, {
      data: {
        message: message,
        action: 'Ok',
      },
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: action == 'loading' ? 10000 : 4000,
      panelClass: action?.toLowerCase(),
    });
  }

  close() {
    this.snackbar.dismiss();
  }

  openAfter() {
    setTimeout(() => {
      if (this.snackbar._openedSnackBarRef?._open === undefined) {
        this.openSnackBar('Carregando...', 'loading');
      }
    }, this.timer);
  }
}
