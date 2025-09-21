import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterLink } from '@angular/router';
import { Header2 } from '../../components/header2/header2';
import { Donacion, DonacionService } from '../../services/donacion';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-enviar-donacion',
  imports: [Header2, Footer, RouterLink],
  templateUrl: './enviar-donacion.html',
  styleUrl: './enviar-donacion.css',
})
export class EnviarDonacion {
  UsuarioActual: number = 0;
  mostrarDireccion: boolean = false;

  NuevaDonacion: Donacion = {
    desc_Donacion: '',
    cantidad_Donacion: 0,
    fecha_Donacion: new Date().toISOString().split('T')[0] as any,
    estado_Donacion: 0,
    usuario: {
      id: 0,
    },
    peticion: {
      id: 0,
    },
    categoriaId: 0,
    direccion: ''
  };

  constructor(
    private usuarioService: UsuarioService,
    private peticionService: UsuarioService,
    private donacionService: DonacionService
  ) {}

  ObtenerUsuario() {
    this.UsuarioActual = this.usuarioService.getUsuarioIdActual();
  }

  CategoriaDonacion() {
  if (this.NuevaDonacion.categoriaId == 1) {
    this.mostrarDireccion = true;
  }
}
}
