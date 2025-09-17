import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterLink, RouterModule } from '@angular/router';
import { InicioSesion } from '../inicio-sesion/inicio-sesion';

@Component({
  selector: 'app-registro',
  imports: [Header, Footer, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

}
