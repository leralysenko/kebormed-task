import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { selectTotalCompanies, selectTotalUsers, selectUsersPerCompany } from '../../store/selectors/user.selectors';
import { CommonModule } from '@angular/common';
import { loadUsers } from '../../store/actions/user.actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CardComponent, CommonModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly store: Store<AppState> = inject(Store);
  private destroy$ = new Subject<void>();

  totalUsers = 0;
  totalCompanies = 0;
  totalUsersForCompanies?: Record<string, number>;

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.select(selectTotalUsers)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.totalUsers = res);
    this.store.select(selectTotalCompanies)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.totalCompanies = res);;
    this.store.select(selectUsersPerCompany)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.totalUsersForCompanies = res);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
