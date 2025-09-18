import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario, UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-inicio-sesion',
  imports: [Header, Footer, RouterLink, FormsModule],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
})
export class InicioSesion {
  usuarios: Usuario[] = [];

  correo: string = '';
  contrasena: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  IniciarSesion() {
    this.usuarioService.getUsuario().subscribe({
      next: (data) => {
        this.usuarios = data;

        const encontrado = this.usuarios.find(
          (u) => u.correo === this.correo && u.contrasena === this.contrasena
        );

        if (encontrado) {
          this.usuarioService.setUsuarioId(encontrado.id!);
          this.router.navigate(['/inicio']);
        } else {
          const error = document.getElementById('error')
          const msError = document.createElement('p');
          msError.textContent="Correo o contraseña incorrectas";
          error?.appendChild(msError);
        }
      },
      error: (err) => {
        console.error('Error al obtener usuarios', err);
        alert('Error de conexión con el servidor');
      },
    });
  }
}
