import { Component, OnInit } from '@angular/core';
import { Header2 } from '../../components/header2/header2';
import { Accesibility } from '../../components/accesibility/accesibility';
import { Footer } from '../../components/footer/footer';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Peticion, PeticionService } from '../../services/peticion';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-actualizar-peticion',
  imports: [Header2, Accesibility, Footer, RouterLink, FormsModule, CommonModule],
  templateUrl: './actualizar-peticion.html',
  styleUrls: ['./actualizar-peticion.css'],
})
export class ActualizarPeticion implements OnInit {
  UsuarioActual: number = 0;
  mostrarDireccion: boolean = false;
  idPeticion: number = 0;

  NuevaPeticion: Peticion = {
    id_peticion: 0,
    nombre_peticion: '',
    desc_peticion: '',
    cantidad_peticion: 0,
    fecha_peticion: new Date().toISOString().split('T')[0] as any,
    estado_peticion: 1,
    direccion: '',
    nequi: '',
    usuario: { id: 0 },
    categoriaId: 0,
  };

  constructor(
    private peticionService: PeticionService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.ObtenerUsuario();
    this.idPeticion = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarPeticion();
  }

  ObtenerUsuario() {
    this.UsuarioActual = this.usuarioService.getUsuarioIdActual();
  }

  cargarPeticion() {
    this.peticionService.getPeticionId(this.idPeticion).subscribe({
      next: (data: Peticion) => {
        this.NuevaPeticion = {
          ...data,
          usuario: { id: data.usuario.id },
          id_peticion: data.id_peticion,
        };
        this.CategoriaPeticion();
      },
      error: (err) => {
        console.error('No se pudo cargar la petición:', err);
        alert('No se pudo cargar la petición');
      },
    });
  }

  CategoriaPeticion() {
    if (this.NuevaPeticion.categoriaId === 1) {
      this.mostrarDireccion = true;
      if (!this.NuevaPeticion.direccion) this.NuevaPeticion.direccion = '';
      this.NuevaPeticion.nequi = null;
    } else {
      this.mostrarDireccion = false;
      if (!this.NuevaPeticion.nequi) this.NuevaPeticion.nequi = '';
      this.NuevaPeticion.direccion = null;
    }
  }

  actualizarPeticion() {
    this.NuevaPeticion.usuario.id = this.UsuarioActual;

    this.peticionService.actualizarPeticion(this.NuevaPeticion).subscribe({
      next: () => {
        alert('Petición actualizada correctamente');
        this.router.navigate(['/inicio/mis-peticiones']);
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        alert('No se pudo actualizar la petición');
      },
    });
  }
}
