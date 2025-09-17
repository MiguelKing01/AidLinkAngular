import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  imports: [Header, Footer, RouterLink],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css'
})
export class InicioSesion {

}
