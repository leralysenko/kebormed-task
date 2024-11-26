import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../model/user';
import { selectAll } from '../../store/reducers/user.reducer';
import { AppState } from '../../store';
import { deleteUser, loadUsers } from '../../store/actions/user.actions';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../../components/list/list.component';
import { DialogService } from '../../services/dialog.service';
import { Subject, filter, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ListComponent,  MatIconModule, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit, OnDestroy {
  private readonly store: Store<AppState> = inject(Store);
  private readonly dialogService = inject(DialogService);
  private destroy$ = new Subject<void>();

  users: User[] = [];

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.select((state) => selectAll(state.users))
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => this.users = res);
  }

  deleteUser(userId: number): void {
    this.dialogService.openDialog('Delete User',
    'Would you like to delete user?')
    .pipe(
      takeUntil(this.destroy$),
      filter(res => res))
    .subscribe(() => this.store.dispatch(deleteUser({ userId })))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
