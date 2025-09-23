import { Component, OnInit } from '@angular/core';
import { Header2 } from '../../components/header2/header2';
import { Accesibility } from '../../components/accesibility/accesibility';
import { Footer } from '../../components/footer/footer';
import { Peticion, PeticionService } from '../../services/peticion';
import { UsuarioService } from '../../services/usuario';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ver-peticiones',
  imports: [Header2, Accesibility, Footer, CommonModule, RouterModule],
  templateUrl: './ver-peticiones.html',
  styleUrl: './ver-peticiones.css'
})
export class VerPeticiones implements OnInit {
  UsuarioActual: number = 0;
  Peticiones: Peticion[] = [];
  cargando: boolean = true;

  constructor(
    private peticionService: PeticionService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.ObtenerUsuario();
    this.cargarPeticiones();
  }

  ObtenerUsuario() {
    this.UsuarioActual = this.usuarioService.getUsuarioIdActual();
  }

  cargarPeticiones() {
    this.peticionService.getPeticionesUsuario(this.UsuarioActual).subscribe({
      next: (data: Peticion[]) => {
        this.Peticiones = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar peticiones:', err);
        this.cargando = false;
      },
    });
  }
}
