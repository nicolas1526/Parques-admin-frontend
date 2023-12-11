import { Component, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { map } from 'rxjs';
import { Table } from 'primeng/table';
import { Horario } from 'src/app/models/horario.model';
import { HorarioService } from 'src/app/services/horario.service';
import { Parques } from 'src/app/models/parques.model';
import { ParquesService } from 'src/app/services/parques.service';
import { Banco } from 'src/app/models/banco.model';
import { BancoService } from 'src/app/services/bancos.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  providers: [ConfirmationService],
  styleUrls: ['./bancos.component.scss']
})
export class BancosComponent {
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('Formulario') formulario!: NgForm;
  postOput: boolean = true;
  display: boolean = false;
  loading: boolean = true;

  bancos: Banco[] = [];
  bancosSeleccionado: Banco = {};
  estados: SelectItem[] = [];
  estadoSeleccionado?: boolean;
  dialog = {
    color: '',
    visible: false,
    message: '',
    title: '',
    icon: ''
  }



  horarios: Horario[] = [];
  horarioSeleccionado: Horario = {};
  parques: SelectItem[] = [];
  parqueSeleccionado?: Parques;



  constructor(
    private bancoService: BancoService,
    private horarioService: HorarioService,
    private parqueService: ParquesService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.estados = [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ];
    this.getBancos();
  }

  getBancos() {
    this.bancoService.getBancos().subscribe(
      (data) => {
        this.bancos = data;
        this.loading = false;
      },
      (error) => {
        this.dialog = {
          color: 'red',
          icon: 'pi pi-times-circle',
          title: 'Error crear abono',
          message: error.error.msg,
          visible: true
        }
      }
    );
  }

  createBanco() {
    if (this.validarFormulario()) {
      this.bancoService
        .createBanco(this.bancosSeleccionado)
        .subscribe(
          (data) => {

            this.bancosSeleccionado.id = data.Idbanco;
            this.bancos.push(this.bancosSeleccionado);
          },
          (error) => {
            this.dialog = {
              color: 'red',
              icon: 'pi pi-times-circle',
              title: 'Error crear abono',
              message: error.error.msg,
              visible: true
            }
          }
        );
      this.display = false;
    }
  }

  deleteBanco(idBanco: number) {
    this.bancoService.deleteBanco(idBanco).subscribe(
      () => {
        const index = this.bancos.findIndex(
          (dep) => dep.id === idBanco
        );
        this.bancos.splice(index, 1);
      },
      (error) => {
        this.dialog = {
          color: 'red',
          icon: 'pi pi-times-circle',
          title: 'Error crear abono',
          message: error.error.msg,
          visible: true
        }
      }
    );
  }

  updateBanco() {
    if (this.validarFormulario()) {
      this.bancoService.updateBanco(this.bancosSeleccionado).subscribe(
        (data) => {
          const index = this.bancos.findIndex(
            (res) => res.id === this.bancosSeleccionado.id
          );

          this.bancos[index] = {
            id: data.Idbanco,
            nombre: data.nombre,
            estado: data.estado
          }
        },
        (error) => {
          this.dialog = {
            color: 'red',
            icon: 'pi pi-times-circle',
            title: 'Error crear abono',
            message: error.error.msg,
            visible: true
          }
        }
      );
      this.display = false;
    }
  }

  openDialogCreate() {
    this.bancosSeleccionado = {};
    this.display = true;
    this.postOput = true;
  }

  openDialogUpdate(idBanco: number) {

    const index = this.bancos.findIndex(
      (data) => data.id === idBanco
    );
    this.bancosSeleccionado = this.bancos[index];
    this.display = true;
    this.postOput = false;
  }

  createOrUpdate() {
    if (this.bancosSeleccionado !== undefined) {
      if (this.postOput) {
        this.createBanco();
      } else {
        this.updateBanco();
      }
    }
  }

  confirmarEliminar(idBanco: number) {
    this.confirmationService.confirm({
      key: 'confirmarEliminar',
      message: '¿Seguro quiere elimiar este banco?',
      accept: () => {
        this.deleteBanco(idBanco);
      },
    });
  }

  validarFormulario(): boolean {
    let isValid = true;
    if (this.bancosSeleccionado.nombre === undefined || this.bancosSeleccionado.nombre.trim() === '') {
      this.formulario.form.controls['nombre'].setErrors({
        incorrect: true,
      });
      isValid = false;
    }

    if (this.bancosSeleccionado.estado === undefined) {
      this.formulario.form.controls['estado'].setErrors({
        incorrect: true,
      });
      isValid = false;
    }
    return isValid;
  }

  tieneError(controlName: string, errorName: string): boolean {
    const control = this.formulario?.form.controls[controlName];
    return control?.hasError(errorName) || false;
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
