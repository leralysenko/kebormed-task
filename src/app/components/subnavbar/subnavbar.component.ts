import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-subnavbar',
  standalone: true,
  imports: [ MatToolbarModule, CommonModule, MatButtonModule ],
  templateUrl: './subnavbar.component.html',
  styleUrl: './subnavbar.component.scss'
})
export class SubnavbarComponent {
  private readonly router: Router = inject(Router);
  currentRoute: string = '';

  menus: Record<string, string[]> = {
    users: ['Create', 'Import']
  };

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateMenu();
    });
  }

  get currentMenu(): string[] {
    return this.menus[this.currentRoute] || [];
  }
  
  onMenuClick(menuItem: string): void {
    console.log(`You selected ${menuItem}`);
  }

  private updateMenu(): void {
    const route = this.router.url.split('/')[1];
    this.currentRoute = route;
  }
}
