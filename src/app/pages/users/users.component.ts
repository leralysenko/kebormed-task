import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../model/user';
import { selectAll } from '../../store/reducers/user.reducer';
import { AppState } from '../../store';
import { deleteUser, loadUsers } from '../../store/actions/user.actions';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../../components/list/list.component';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmComponent } from "../../components/confirm/confirm.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ListComponent, MatIconModule, MatButtonModule, ConfirmComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit, OnDestroy {
  private readonly store: Store<AppState> = inject(Store);
  private destroy$ = new Subject<void>();

  users: User[] = [];
  currentUser: User | null = null;
  showConfirmDialog = false;

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.select((state) => selectAll(state.users))
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => this.users = res);
  }

  openConfirmDialog(user: User): void {
    this.currentUser = user;
    this.showConfirmDialog = true;
  }

  deleteUser(isConfirmed: boolean): void {
    if(isConfirmed) {
      this.store.dispatch(deleteUser({ userId: this.currentUser!.id }));
    }
    this.showConfirmDialog = false;
    this.currentUser = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
