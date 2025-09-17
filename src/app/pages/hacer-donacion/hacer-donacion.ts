import { Component } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { RouterLink } from '@angular/router';
import { Header2 } from '../../components/header2/header2';

@Component({
  selector: 'app-hacer-donacion',
  standalone: true,
  imports: [Header2, Footer, RouterLink],
  templateUrl: './hacer-donacion.html',
  styleUrl: './hacer-donacion.css'
})
export class HacerDonacion {

}
