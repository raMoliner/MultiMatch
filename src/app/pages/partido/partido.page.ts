import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Partido } from 'src/app/models/models';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.page.html',
  styleUrls: ['./partido.page.scss'],
})
export class PartidoPage implements OnInit {
  partidoId: string;
  partido: Partido | undefined;

  constructor(
    private route: ActivatedRoute,
    private almacenamientoService: AlmacenamientoService
  ) {
    this.partidoId = this.route.snapshot.paramMap.get('partidoId') || '';
  }

  ngOnInit() {
    this.loadPartido();
  }

  async loadPartido() {
    const partidos = await this.almacenamientoService.get<Partido[]>('partidos');
    if (partidos) {
      this.partido = partidos.find(p => p.id === this.partidoId);
    }
  }
}
