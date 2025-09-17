import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Header2 } from '../../components/header2/header2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-postulacion',
  imports: [Header2, Footer],
  templateUrl: './postulacion.html',
  styleUrl: './postulacion.css'
})
export class Postulacion {

}
