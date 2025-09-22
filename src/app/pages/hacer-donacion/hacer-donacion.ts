import { Component } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { Router, RouterLink } from '@angular/router';
import { Header2 } from '../../components/header2/header2';
import { DonacionService } from '../../services/donacion';
import { Peticion, PeticionService } from '../../services/peticion';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Accesibility } from '../../components/accesibility/accesibility';

@Component({
  selector: 'app-hacer-donacion',
  standalone: true,
  imports: [Header2, Footer, RouterLink, FormsModule, CommonModule, Accesibility],
  templateUrl: './hacer-donacion.html',
  styleUrl: './hacer-donacion.css',
})
export class HacerDonacion {
  Peticiones: Peticion[] = [];

  constructor(
    private donacionService: DonacionService,
    private peticionService: PeticionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.peticionService.getPeticion().subscribe({
      next: (data: Peticion[]) => {
        this.Peticiones = data;
      },
      error: (err) => console.error(err),
    });
  }
}
