import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../model/user';
import { loadUserDetails } from '../../../store/actions/user.actions';
import { selectSelectedUser } from '../../../store/selectors/user.selectors';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  user!: User | null;
  
  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
  }
}
