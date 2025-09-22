import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Accesibility } from '../../components/accesibility/accesibility';

@Component({
  selector: 'app-nosotros',
  imports: [Header, Footer, Accesibility],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class Nosotros {

}
