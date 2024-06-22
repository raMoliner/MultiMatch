import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Reserva } from 'src/app/models/models';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {
  reservas: Reserva[] = [];

  constructor(private almacenamientoService: AlmacenamientoService) {}

  ngOnInit() {
    this.loadReservas();
  }

  async loadReservas() {
    this.reservas = (await this.almacenamientoService.getReservas().toPromise()) || [];
  }

  nuevaReserva() {
    console.log('Nueva reserva');
  }
}
