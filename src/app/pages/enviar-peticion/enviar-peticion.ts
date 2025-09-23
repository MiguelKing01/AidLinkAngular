import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterLink } from '@angular/router';
import { Header2 } from '../../components/header2/header2';
import { FormsModule } from '@angular/forms';
import { Peticion, PeticionService } from '../../services/peticion';
import { UsuarioService } from '../../services/usuario';
import { CommonModule } from '@angular/common';
import { Accesibility } from '../../components/accesibility/accesibility';

@Component({
  selector: 'app-enviar-peticion',
  imports: [Header2, Footer, RouterLink, FormsModule, CommonModule, Accesibility],
  templateUrl: './enviar-peticion.html',
  styleUrl: './enviar-peticion.css',
})
export class EnviarPeticion {
  UsuarioActual: number = 0;
  mostrarDireccion: boolean = false;

  NuevaPeticion: Peticion = {
    nombre_peticion: '',
    desc_peticion: '',
    cantidad_peticion: 0,
    fecha_peticion: new Date().toISOString().split('T')[0] as any,
    estado_peticion: 1,
    direccion: '',
    nequi: '',
    usuario: { id: 0},
    categoriaId: 0,
  };

  constructor(private peticionService: PeticionService, private usuarioService: UsuarioService) {}

  ObtenerUsuario() {
    this.UsuarioActual = this.usuarioService.getUsuarioIdActual();
  }

CategoriaPeticion() {
  if (this.NuevaPeticion.categoriaId == 1) {
    this.mostrarDireccion = true;
    this.NuevaPeticion.nequi = null;
  } else {
    this.mostrarDireccion = false;
    this.NuevaPeticion.direccion = null;
  }
}


  crearPeticion() {
    this.ObtenerUsuario(); 
    this.NuevaPeticion.usuario.id = this.UsuarioActual;
    this.peticionService.crearPeticion(this.NuevaPeticion).subscribe({
      next() {
        alert('La peticion fue creada');
      },
      error(err) {
        console.log('No se pudo enviar la peticion'), alert('No se pudo crear la peticion');
      },
    });
  }
}
