import { Component, OnInit } from '@angular/core';
import { Header2 } from '../../components/header2/header2';
import { Accesibility } from '../../components/accesibility/accesibility';
import { Footer } from '../../components/footer/footer';
import { Donacion, DonacionService } from '../../services/donacion';
import { UsuarioService } from '../../services/usuario';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ver-donaciones',
  imports: [Header2, Accesibility, Footer, CommonModule, RouterModule],
  templateUrl: './ver-donaciones.html',
  styleUrls: ['./ver-donaciones.css']
})
export class VerDonaciones implements OnInit {
  UsuarioActual: number = 0;
  Donaciones: Donacion[] = [];
  cargando: boolean = true;

  constructor(
    private donacionService: DonacionService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.ObtenerUsuario();
    this.cargarDonaciones();
  }

  ObtenerUsuario() {
    this.UsuarioActual = this.usuarioService.getUsuarioIdActual();
  }

  cargarDonaciones() {
    this.donacionService.getDonaciones().subscribe({
      next: (data: Donacion[]) => {
        this.Donaciones = data.filter(d => d.usuarioId.id === this.UsuarioActual);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar donaciones:', err);
        this.cargando = false;
      },
    });
  }
}
