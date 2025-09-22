import { Component } from '@angular/core';
import { Accesibilidad } from '../../service-acces/accesibilidad';

@Component({
  selector: 'app-accesibility',
  imports: [],
  templateUrl: './accesibility.html',
  styleUrl: './accesibility.css'
})
export class Accesibility {

  constructor(private accesibilityService : Accesibilidad){}

  aumentar() {
    this.accesibilityService.aumentarFuente();
  }

  disminuir() {
    this.accesibilityService.disminuirFuente();
  }

  alternarContraste() {
    this.accesibilityService.toggleContraste();
  }

}
