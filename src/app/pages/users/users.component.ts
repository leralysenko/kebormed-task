import { Component, OnDestroy, inject } from '@angular/core';
import { User } from '../../model/user';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../../components/list/list.component';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmComponent } from "../../components/confirm/confirm.component";
import { UsersRepository } from '../../state/user.repository';
import { UserService } from '../../services/user.service';
import {Dialog, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ListComponent, MatIconModule, MatButtonModule,
    DialogModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnDestroy {
  private readonly userService: UserService = inject(UserService);
  private readonly destroy$ = new Subject<void>();
  private readonly dialogService: DialogService = inject(DialogService);

  repo: UsersRepository = inject(UsersRepository);

  deleteUser(user: User): void {
    const data = this.dialogService.createDialogData(
      'Delete User', 'Would you like to delete user?',
      'CONFIRM', 'CANCEL', user.name
    );
    this.dialogService.openDialog(data).pipe(
      takeUntil(this.destroy$),
      switchMap(() => this.userService.deleteUser(user.id))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
