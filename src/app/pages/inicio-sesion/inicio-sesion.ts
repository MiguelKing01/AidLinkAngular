import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario, UsuarioService } from '../../services/usuario';
import { CommonModule } from '@angular/common';
import { Accesibility } from '../../components/accesibility/accesibility';

@Component({
  selector: 'app-inicio-sesion',
  imports: [Header, Footer, RouterLink, FormsModule, ReactiveFormsModule, CommonModule, Accesibility],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
})
export class InicioSesion {

  usuarios: Usuario[] = [];

  inicioSesion = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  IniciarSesion() {
    if (this.inicioSesion.invalid)
      return; 

    const { correo, contrasena } = this.inicioSesion.value;

    this.usuarioService.getUsuario().subscribe({
      next: (data) => {
        this.usuarios = data;

        const encontrado = this.usuarios.find(
          (u) => u.correo === correo && u.contrasena === contrasena
        );

        if (encontrado) {
          this.usuarioService.setUsuarioId(encontrado.id!);
          this.router.navigate(['/inicio']);
        } else {
          const error = document.getElementById('error');
          if (error) {
            error.innerHTML = ""; 
            const msError = document.createElement('p');
            msError.textContent = "Correo o contraseña incorrectas";
            error.appendChild(msError);
          }
        }
      },
      error: (err) => {
        console.error('Error al obtener usuarios', err);
        alert('Error de conexión con el servidor');
      },
    });
  }

  get correoControl() {
    return this.inicioSesion.get('correo');
  }

  get contrasenaControl() {
    return this.inicioSesion.get('contrasena');
  }
}