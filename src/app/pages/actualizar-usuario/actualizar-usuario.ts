import { Component, OnInit } from '@angular/core';
import { Header2 } from '../../components/header2/header2';
import { Accesibility } from '../../components/accesibility/accesibility';
import { Footer } from '../../components/footer/footer';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario, UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-actualizar-usuario',
  imports: [Header2, Accesibility, Footer, RouterLink, FormsModule, CommonModule],
  templateUrl: './actualizar-usuario.html',
  styleUrls: ['./actualizar-usuario.css'],
})
export class ActualizarUsuario implements OnInit {
  usuarioId: number = 0;
  usuario: Usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
  };

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarUsuario();
  }

  cargarUsuario() {
    const id = this.usuarioService.getUsuarioIdActual();
    if (id !== undefined) {
      this.usuarioService.getUsuarioId(id).subscribe({
        next: (data: Usuario) => {
          this.usuario = data;
        },
        error: (err) => {
          console.error('Error al cargar el usuario:', err);
          alert('No se pudo cargar el usuario');
        },
      });
    } else {
      alert('No hay usuario seleccionado.');
    }
  }

  actualizarUsuario() {
    this.usuario.id = this.usuarioId; 
    this.usuarioService.actualizarUsuario(this.usuario).subscribe({
      next: () => {
        alert('Usuario actualizado correctamente');
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        alert('No se pudo actualizar el usuario');
      },
    });
  }
}
