import { Component, OnDestroy, inject } from '@angular/core';
import { User } from '../../model/user';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../../components/list/list.component';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmComponent } from "../../components/confirm/confirm.component";
import { UsersRepository } from '../../state/user.repository';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ListComponent, MatIconModule, MatButtonModule, ConfirmComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnDestroy {
  private readonly userService: UserService = inject(UserService);
  private readonly destroy$ = new Subject<void>();

  repo: UsersRepository = inject(UsersRepository);

  currentUser: User | null = null;
  showConfirmDialog = false;

  openConfirmDialog(user: User): void {
    this.currentUser = user;
    this.showConfirmDialog = true;
  }

  deleteUser(isConfirmed: boolean): void {
    if(isConfirmed) {
      this.userService.deleteUser(this.currentUser!.id).pipe(takeUntil(this.destroy$)).subscribe();
    }
    this.showConfirmDialog = false;
    this.currentUser = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
