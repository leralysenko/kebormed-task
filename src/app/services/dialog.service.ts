import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  openDialog(title: string, message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: { title, message },
    });

    return dialogRef.afterClosed();
  }
}
