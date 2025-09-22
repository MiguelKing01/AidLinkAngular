import { Component } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header2 } from '../../components/header2/header2';
import { Donacion, DonacionService } from '../../services/donacion';
import { UsuarioService } from '../../services/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Peticion, PeticionService } from '../../services/peticion';
import { Accesibility } from '../../components/accesibility/accesibility';

@Component({
  selector: 'app-enviar-donacion',
  imports: [Header2, Footer, RouterLink, FormsModule, CommonModule, Accesibility],
  templateUrl: './enviar-donacion.html',
  styleUrl: './enviar-donacion.css',
})
export class EnviarDonacion {
  idPeticion!: number;
  idCategoria!: number;
  UsuarioActual: number = 0;
  mostrarDireccion: boolean = false;
  Peticion!: Peticion;

  NuevaDonacion: Donacion = {
    desc_Donacion: '',
    cantidad_Donacion: 0,
    fecha_Donacion: new Date().toISOString().split('T')[0],
    estado_Donacion: 0,
    usuarioId: { id: 0 },
    peticionId: { id_peticion: 0 },
    categoriaId: 0,
    direccion: '',
  };

  constructor(
    private usuarioService: UsuarioService,
    private peticionService: PeticionService,
    private donacionService: DonacionService,
    private route: ActivatedRoute
  ) {}

  ObtenerUsuario() {
    this.UsuarioActual = this.usuarioService.getUsuarioIdActual();
  }

  CategoriaDonacion() {
    this.mostrarDireccion = this.NuevaDonacion.categoriaId == 1;
  }

  obtenerPeticionCategoria() {
    this.idPeticion = Number(this.route.snapshot.paramMap.get('id'));
    this.idCategoria = Number(this.route.snapshot.paramMap.get('categoriaId'));
  }

  ngOnInit() {
  this.idPeticion = Number(this.route.snapshot.paramMap.get('id'));
  this.idCategoria = Number(this.route.snapshot.paramMap.get('categoriaId'));

  this.peticionService.getPeticionId(this.idPeticion).subscribe({
    next: (data) => {
      this.Peticion = data;
    },
    error: (err) => console.error(err),
  });
  }

  crearDonacion() {
    this.ObtenerUsuario();
    this.NuevaDonacion.usuarioId.id = this.UsuarioActual;
    this.obtenerPeticionCategoria();
    this.NuevaDonacion.peticionId.id_peticion = this.idPeticion;
    this.NuevaDonacion.categoriaId = this.idCategoria;
    this.donacionService.crearDonacion(this.NuevaDonacion).subscribe({
      next: () => {
        alert('La donacion ha sido credada');
      },
      error: (err) => {
        alert('La donacion no se pudo crear');
      },
    });
  }
}
