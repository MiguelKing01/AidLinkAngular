import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterLink } from '@angular/router';
import { Header2 } from '../../components/header2/header2';

@Component({
  selector: 'app-enviar-donacion',
  imports: [Header2, Footer, RouterLink],
  templateUrl: './enviar-donacion.html',
  styleUrl: './enviar-donacion.css'
})
export class EnviarDonacion {

}
