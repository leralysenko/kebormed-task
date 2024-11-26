import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { User } from '../../model/user';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatListModule, CommonModule,
    RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() users: User[] = [];

  @Input() actionTemplate!: TemplateRef<{user: User}>;
}
