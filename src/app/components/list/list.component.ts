import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../model/user';
import { ActionType } from '../../model/action-type';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ActionEvent } from '../../model/action-event';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatListModule, CommonModule, MatButtonModule, MatIconModule,
    RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() users: User[] = [];
  @Input() actionButtons: { action: ActionType, icon: string }[] = [];
  @Output() userAction: EventEmitter<ActionEvent> = new EventEmitter();

  onActionButtonClick(user: User, action: ActionType): void {
    this.userAction.emit({ user, action });
  }
}
