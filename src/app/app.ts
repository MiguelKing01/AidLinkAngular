import { Component, signal } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Contenido } from './contenido/contenido';
import { Inicio } from './inicio/inicio';
import { InicioSesion } from './inicio-sesion/inicio-sesion';
import { Registro } from './registro/registro';
import { HacerDonacion } from './hacer-donacion/hacer-donacion';
import { Postulacion } from './postulacion/postulacion';
import { SubirVacante } from './subir-vacante/subir-vacante';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, Contenido, Inicio, InicioSesion, Registro,HacerDonacion, Postulacion, SubirVacante],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AidLink');
}

