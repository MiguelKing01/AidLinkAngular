import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hacer-peticion',
  imports: [Header, Footer, RouterLink],
  templateUrl: './hacer-peticion.html',
  styleUrl: './hacer-peticion.css'
})
export class HacerPeticion {

}
