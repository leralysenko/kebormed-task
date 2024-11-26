import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  @Input() title!: string;
  @Input() message!: string;
  @Input() confirmButtonLabel = 'YES';
  @Input() cancelButtonLabel = 'NO';

  @Input() entityNameToConfirm?: string = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  entityName: string = '';

  get isEntityNameValid(): boolean {
    return this.entityName === this.entityNameToConfirm;
  }

  onConfirm() {
    if (this.isEntityNameValid) {
      this.confirm.emit();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
