import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../model/user';
import { selectAll } from '../../store/reducers/user.reducer';
import { AppState } from '../../store';
import { deleteUser, loadUsers } from '../../store/actions/user.actions';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../../components/list/list.component';
import { ActionType } from '../../model/action-type';
import { DialogService } from '../../services/dialog.service';
import { filter } from 'rxjs';
import { ActionEvent } from '../../model/action-event';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ListComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {
  private readonly store: Store<AppState> = inject(Store);
  private readonly dialogService = inject(DialogService);

  users: User[] = [];
  buttons = [
    { action: ActionType.delete, icon: 'delete' }
  ]

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.select((state) => selectAll(state.users)).subscribe(res => this.users = res);
  }

  onActionButtonClick(event: ActionEvent) {
    switch(event.action) {
      case ActionType.delete: this.deleteUser(event.user.id);
        break;
      default: throw new Error('Wrong action type');
    }
  }

  deleteUser(userId: number): void {
    this.dialogService.openDialog('Delete User',
    'Would you like to delete user?')
    .pipe(filter(res => res))
    .subscribe(() => this.store.dispatch(deleteUser({ userId })))
  }
}
