import { Component, OnInit } from '@angular/core';
import { Header2 } from '../../components/header2/header2';
import { Accesibility } from '../../components/accesibility/accesibility';
import { Footer } from '../../components/footer/footer';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Donacion, DonacionService } from '../../services/donacion';
import { UsuarioService } from '../../services/usuario';
import { Peticion, PeticionService } from '../../services/peticion';

@Component({
  selector: 'app-actualizar-donacion',
  imports: [Header2, Accesibility, Footer, RouterLink, FormsModule, CommonModule],
  templateUrl: './actualizar-donacion.html',
  styleUrls: ['./actualizar-donacion.css'],
})
export class ActualizarDonacion implements OnInit {
  UsuarioActual: number = 0;
  mostrarDireccion: boolean = false;
  idDonacion: number = 0;
  idPeticion: number = 0;

  NuevaDonacion: Donacion = {
    id_Donacion: 0,
    desc_Donacion: '',
    cantidad_Donacion: 0,
    fecha_Donacion: new Date().toISOString().split('T')[0],
    estado_Donacion: 1,
    usuarioId: { id: 0 },
    peticionId: { id_peticion: 0 },
    categoriaId: 0,
    direccion: '',
  };

  constructor(
    private donacionService: DonacionService,
    private usuarioService: UsuarioService,
    private peticionService: PeticionService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.ObtenerUsuario();
    this.idDonacion = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDonacion();
  }

  ObtenerUsuario() {
    this.UsuarioActual = this.usuarioService.getUsuarioIdActual();
  }

  cargarDonacion() {
    this.donacionService.getDonaciones().subscribe({
      next: (data: Donacion[]) => {
        const don = data.find(d => d.id_Donacion === this.idDonacion);
        if (!don) {
          alert('No se pudo cargar la donación');
          return;
        }
        this.NuevaDonacion = {
          ...don,
          usuarioId: { id: don.usuarioId.id },
          peticionId: { id_peticion: don.peticionId.id_peticion },
          id_Donacion: don.id_Donacion,
        };
        this.CategoriaDonacion();
      },
      error: (err) => {
        console.error('No se pudo cargar la donación:', err);
        alert('No se pudo cargar la donación');
      },
    });
  }

  CategoriaDonacion() {
    if (this.NuevaDonacion.categoriaId === 1) {
      this.mostrarDireccion = true;
      if (!this.NuevaDonacion.direccion) this.NuevaDonacion.direccion = '';
    } else {
      this.mostrarDireccion = false;
      this.NuevaDonacion.direccion = null;
    }
  }

  actualizarDonacion() {
    this.NuevaDonacion.usuarioId.id = this.UsuarioActual;


    this.donacionService
      .crearDonacion(this.NuevaDonacion)
      .subscribe({
        next: () => {
          alert('Donación actualizada correctamente');
          this.router.navigate(['/inicio/mis-donaciones']);
        },
        error: (err) => {
          console.error('Error al actualizar la donación:', err);
          alert('No se pudo actualizar la donación');
        },
      });
  }
}
