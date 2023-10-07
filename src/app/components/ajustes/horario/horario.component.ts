import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { map } from 'rxjs';
import { Table } from 'primeng/table';
import { Horario } from 'src/app/models/horario.model';
import { HorarioService } from 'src/app/services/horario.service';
import { Parques } from 'src/app/models/parques.model';
import { ParquesService } from 'src/app/services/parques.service';

@Component({
  templateUrl: './horario.component.html',
  providers: [ConfirmationService],
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent {
  @ViewChild('filter') filter!: ElementRef;
  postOput: boolean = true;
  display: boolean = false;
  loading: boolean = true;

  horarios: Horario[] = [];
  horarioSeleccionado: Horario = {};
  parques: SelectItem[] = [];
  parqueSeleccionado?: Parques;

  constructor(
    private horarioService: HorarioService,
    private parqueService: ParquesService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getParques();
    this.getHorarios();
  }

  getParques() {
    this.parqueService
      .getParques()
      .pipe(
        map((parques) => {

          return parques.map((parque) => ({
            label: parque.nombre,
            value: {
              id: parque.id,
              nombre: parque.nombre
            },
          }));
        })
      )
      .subscribe(
        (data) => {
          this.parques = data;
        },
        (error) => {
          console.error('Error en la peticion: ', error);
        }
      );
  }

  getHorarios() {
    this.horarioService.getHorarios().subscribe(
      (data) => {
        this.horarios = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error en la peticion: ', error);
      }
    );
  }

  createHorario() {
    this.horarioSeleccionado.Parque = this.parqueSeleccionado;
    this.horarioSeleccionado.idParque = this.parqueSeleccionado?.id;
    this.horarioService
      .createHorario(this.horarioSeleccionado)
      .subscribe(
        (data) => {

          this.horarioSeleccionado.id = data.id;
          console.log(this.horarioSeleccionado)
          this.horarios.push(this.horarioSeleccionado);
        },
        (error) => {
          console.error('Error en la peticion: ', error);
        }
      );
    this.display = false;
  }

  updateHorario(horario: Horario) {

    horario.idParque = this.parqueSeleccionado?.id;
    this.horarioService.updateHorario(horario).subscribe(
        (data) => {
            const indexHorario = this.horarios.findIndex(
                (res) => res.id === horario.id
            );

            const indexParque = this.parques.findIndex(
                (res) => res.value.id === data.idParque
            );
            this.horarios[indexHorario] = {
                id: data.id,
                horaEntradaParque: data.horaEntradaParque,
                horaSalidaParque: data.horaSalidaParque,
                checkinAlojamiento: data.checkinAlojamiento,
                checkoutAlojamiento: data.checkoutAlojamiento,
                horarioCampin: data.horarioCampin,
                horarioRelatoria: data.horarioRelatoria,
                horarioBicicar: data.horarioBicicar,
                idParque: data.idParque,
                Parque:{
                    id: data.idParque,
                    nombre: this.parques[indexParque].value.nombre
                }
            }
        },
        (error) => {
            console.error('Error en la peticion: ', error);
        }
    );
}

  deleteHorario(idHorario: number) {
    this.horarioService.deleteHorario(idHorario).subscribe(
      () => {
        const index = this.horarios.findIndex(
          (dep) => dep.id === idHorario
        );
        this.horarios.splice(index, 1);
      },
      (error) => {
        console.error('Error en la peticion: ', error);
      }
    );
  }

  createOrUpdate() {
    if (this.horarioSeleccionado !== undefined) {
      if (this.postOput) {
        this.createHorario();
      } else {
        this.updateHorario(this.horarioSeleccionado);
      }
      this.display = false;
    }
  }

  openDialogCreate() {
    this.horarioSeleccionado = {};
    this.parqueSeleccionado = {};
    this.display = true;
    this.postOput = true;
  }

  openDialogUpdate(idHorario: number) {

    const index = this.horarios.findIndex(
      (data) => data.id === idHorario
    );
    this.horarioSeleccionado = this.horarios[index];
    this.parqueSeleccionado = {
      id: this.horarioSeleccionado.Parque?.id,
      nombre: this.horarioSeleccionado.Parque?.nombre
    };
    this.display = true;
    this.postOput = false;
  }

  confirmarEliminar(idHorario: number) {
    this.confirmationService.confirm({
      key: 'confirmarEliminar',
      message: '¿Seguro quiere elimiar este horario?',
      accept: () => {
        this.deleteHorario(idHorario);
      },
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}
