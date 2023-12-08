import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-reservas',
  templateUrl: './detalle-reservas.component.html',
  styleUrls: ['./detalle-reservas.component.scss']
})
export class DetalleReservasComponent implements OnInit{
  idReserva?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idReserva = this.route.snapshot.paramMap.get('id')!;
}
}
