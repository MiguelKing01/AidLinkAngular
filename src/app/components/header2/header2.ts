import { Component, HostListener, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.html',
  imports: [RouterModule, CommonModule],
  styleUrls: ['./header2.css']
})
export class Header2 implements OnInit {
  menuOpen: boolean = false;
  private routerSub!: Subscription;
  usuarioId: number = 0;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioId = this.usuarioService.getUsuarioIdActual(); // obtiene el id del usuario
  }

  toggleMenu(e: MouseEvent) {
    e.stopPropagation(); 
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