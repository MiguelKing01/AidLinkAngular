import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Contenido } from '../contenido/contenido';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Inicio } from '../inicio/inicio';
import { authGuard } from '../guardas/auth-guard';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}

export const routes: Routes = [
  {
      path: 'Inicio', component:Inicio
  },
  // {
  //     path: 'productos', component:Inicio, canActivate:[authGuard]
  // },
  // {
  //     path: '**', redirectTo: ''
  // },
];
