import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-contenido',
  imports: [RouterModule, RouterLink, Header, Footer],
  templateUrl: './contenido.html',
  styleUrl: './contenido.css'
})
export class Contenido {

}
