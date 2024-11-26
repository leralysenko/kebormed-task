import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  user!: User | null;
  
  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
  }
}
