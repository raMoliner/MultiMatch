import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Reserva } from 'src/app/models/models';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {
  reservas: Reserva[] = []; // Inicializar reservas

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarReservas();
  }

  cargarReservas() {
    this.apiService.obtenerReservas().subscribe(data => {
      this.reservas = data;
    });
  }

  nuevaReserva() {
    // Lógica para crear una nueva reserva
  }
}

