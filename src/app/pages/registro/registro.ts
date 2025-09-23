import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Usuario, UsuarioService } from '../../services/usuario';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Accesibility } from '../../components/accesibility/accesibility';

@Component({
  selector: 'app-registro',
  imports: [Header, Footer, RouterLink, FormsModule, ReactiveFormsModule, CommonModule, Accesibility],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})

export class Registro {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {

    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', [Validators.required]],
    }, {
      validators: this.passwordsIguales 
    });
  }

  passwordsIguales(form: FormGroup) {
    const pass = form.get('contrasena')?.value;
    const confirm = form.get('confirmarContrasena')?.value;
    return pass === confirm ? null : { noCoinciden: true };
  }

  registrarUsuario() {
    if (this.registroForm.valid) {
      const { confirmarContrasena, ...payload } = this.registroForm.value;
      this.usuarioService.crearUsuario(this.registroForm.value).subscribe({
        next: () => {
          alert("Usuario creado con exito");
          this.router.navigate(['/ingresar']);
        },
        error: (err) => {
          console.error('Error al registrar usuario', err);
          alert('No se pudo registrar el usuario');
        },
      });
    }
  }
}
