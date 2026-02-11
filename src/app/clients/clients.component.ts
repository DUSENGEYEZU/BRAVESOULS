import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  constructor(public router: Router) {}
  get isTestimonialsPage(): boolean {
    return this.router.url === '/testimonials';
  }
}
