import { Component, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { UsersRepository } from '../../state/user.repository';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CardComponent, CommonModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  repo: UsersRepository = inject(UsersRepository);
}
