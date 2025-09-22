import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, Routes } from '@angular/router';
// Removed duplicate import of RouterOutlet

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AidLink');
}

