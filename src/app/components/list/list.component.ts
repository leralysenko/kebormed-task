import { Component, Input, TemplateRef } from '@angular/core';
import { User } from '../../model/user';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatListModule, CommonModule,
    RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() users: User[] = [];

  @Input() actionTemplate!: TemplateRef<{user: User}>;
}
