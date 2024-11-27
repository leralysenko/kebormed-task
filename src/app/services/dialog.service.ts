import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, filter } from 'rxjs';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { ConfirmData } from '../model/confirm-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private readonly dialog = inject(MatDialog);
  
  openDialog(data: ConfirmData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: data,
    });
    return dialogRef.afterClosed().pipe(filter(res => !!res));
  }

  createDialogData(title: string, message: string, 
    confirmButtonLabel?: string, cancelButtonLabel?: string,
    entityNameToConfirm?: string): ConfirmData {
      return {
        title,
        message,
        confirmButtonLabel,
        cancelButtonLabel,
        entityNameToConfirm
      }
  }
}
