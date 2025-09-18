import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterLink } from '@angular/router';
import { Header2 } from '../../components/header2/header2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enviar-peticion',
  imports: [Header2, Footer, RouterLink, FormsModule],
  templateUrl: './enviar-peticion.html',
  styleUrl: './enviar-peticion.css'
})
export class EnviarPeticion {

}
