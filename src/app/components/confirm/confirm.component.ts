import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule,
    MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent implements OnInit {
  private readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<ConfirmComponent>);

  title!: string;
  message!: string;
  confirmButtonLabel!: string;
  cancelButtonLabel!: string;
  entityNameToConfirm?: string = '';

  entityName: string = '';

  get isEntityNameValid(): boolean {
    return this.entityName === this.entityNameToConfirm;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
    this.confirmButtonLabel = this.data.confirmButtonLabel || 'YES';
    this.cancelButtonLabel = this.data.cancelButtonLabel || 'NO';
    this.entityNameToConfirm = this.data.entityNameToConfirm || '';
  }
}
