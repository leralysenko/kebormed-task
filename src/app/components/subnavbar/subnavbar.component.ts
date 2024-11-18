import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-subnavbar',
  standalone: true,
  imports: [ MatToolbarModule, CommonModule, MatButtonModule ],
  templateUrl: './subnavbar.component.html',
  styleUrl: './subnavbar.component.scss'
})
export class SubnavbarComponent implements OnDestroy {
  private readonly router: Router = inject(Router);
  private destroy$ = new Subject<void>();
  currentRoute: string = '';

  menus: Record<string, string[]> = {
    users: ['Create', 'Import']
  };

  constructor() {
    this.router.events.pipe(
      takeUntil(this.destroy$),
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateMenu(): void {
    const route = this.router.url.split('/')[1];
    this.currentRoute = route;
  }
}
