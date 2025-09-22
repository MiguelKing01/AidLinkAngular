import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterLink } from '@angular/router';
import { Header2 } from '../../components/header2/header2';
import { Accesibility } from '../../components/accesibility/accesibility';

@Component({
  selector: 'app-inicio',
  imports: [Footer, RouterLink, Header2, Accesibility],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {

}
