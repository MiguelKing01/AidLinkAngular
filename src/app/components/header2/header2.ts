import { CommonModule } from '@angular/common';
import { Component, HostListener, NgModule } from '@angular/core';
import { NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-header2',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './header2.html',
  styleUrl: './header2.css'
})

export class Header2 {
  menuOpen = false;
  private routerSub: Subscription;

  constructor(private router: Router) {
    // cerrar menú si hay navegación
    this.routerSub = this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) { this.menuOpen = false; }
    });
  }

  toggleMenu(e: MouseEvent) {
    e.stopPropagation(); // evita que document click cierre inmediatamente
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click')
  closeMenu() {
    this.menuOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.menuOpen = false;
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

}
