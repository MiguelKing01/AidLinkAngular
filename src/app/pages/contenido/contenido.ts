import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Accesibility } from '../../components/accesibility/accesibility';

@Component({
  selector: 'app-contenido',
  imports: [RouterModule, RouterLink, Accesibility, Header, Footer],
  templateUrl: './contenido.html',
  styleUrl: './contenido.css'
})
export class Contenido {

}
