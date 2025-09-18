import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Usuario, UsuarioService } from '../../services/usuario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [Header, Footer, RouterLink, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  nuevoUsuario: Usuario = { 
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
  };

    constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

registrarUsuario() {
  this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe({
    next: () => { 
      this.router.navigate(['/ingresar']);
    },
    error: (err) => {
      console.error('Error al registrar usuario', err);
      alert('No se pudo registrar el usuario');
    }
  });
} 

}
