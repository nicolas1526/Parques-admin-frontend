import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Abonos, ReservaDetalle, Usuario } from 'src/app/models/reserva.model';
import { ListadoReservasService } from 'src/app/services/listado-reservas.service';
import { BancoService } from 'src/app/services/bancos.service';
import { FileUpload } from 'primeng/fileupload';
import { PrereservaService } from 'src/app/services/prereserva.service';



@Component({
  selector: 'app-detalle-reservas',
  templateUrl: './detalle-reservas.component.html',
  providers: [ConfirmationService],
  styleUrls: ['./detalle-reservas.component.scss']
})
export class DetalleReservasComponent implements OnInit {
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('fileUpload') fileUpload1!: FileUpload;
  @ViewChild('Formulario') formulario!: NgForm;
  loading: boolean = false;
  errorImg: boolean = false;
  idReserva?: string;
  reserva: ReservaDetalle[] = [];
  bancos: SelectItem[] = [];
  datosAbono: Abonos = {};
  listaAbonos: Abonos[] = [];
  totalAbonosReserva: number = 0;
  dialog = {
    color: '',
    visible: false,
    message: '',
    title: '',
    icon: ''
  }

  constructor(
    private route: ActivatedRoute,
    private listadoReservaService: ListadoReservasService,
    private prereservaService: PrereservaService,
    private bancoService: BancoService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.idReserva = this.route.snapshot.paramMap.get('id')!;
    this.getReservaById();
    this.getBancos();
    this.getAbonos();
  }

  

  getReservaById() {
    this.listadoReservaService
      .getReservasById(
        this.idReserva!
      )
      .subscribe(
        (data) => {
          if (data) {
            this.reserva.push(data);
            this.loading = true;
          }

        },
        (error) => {
          console.error('Error en la peticion: ', error);
        }
      );
  }

  cancelarPreReserva(idReserva: string) {
    this.prereservaService.cancelarPreReserva(idReserva).subscribe(
      () => {
        this.dialog = {
          color: 'green',
          icon: 'pi pi-check-circle',
          title: 'Cancelar reserva',
          message: `La reserva se ha cancelado`,
          visible: true
        }
        this.reserva[0].Estado!.nombre = "Cancelado";
      },
      (error) => {
        console.error('Error en la peticion: ', error);
      }
    );
  }

  confirmarPreReserva(idReserva: string) {
    this.prereservaService.aprobarPreReserva(idReserva).subscribe(
      () => {
        this.dialog = {
          color: 'green',
          icon: 'pi pi-check-circle',
          title: 'Cancelar reserva',
          message: `La reserva se confirmo`,
          visible: true
        }
        this.reserva[0].Estado!.nombre = "Aprobado";
      },
      (error) => {
        console.error('Error en la peticion: ', error);
      }
    );
  }


  createAbono(datosAbono: Abonos) {
    this.datosAbono.idBanco = this.datosAbono.Banco?.id;
    this.datosAbono.idReserva = Number.parseInt(this.idReserva!);
    this.datosAbono.fecha = this.datosAbono.fechaDate!.toISOString().substring(0, 10);
    this.listadoReservaService.createAbonoReserva(datosAbono).subscribe(
      (data) => {
        if (data !== null) {
          data.Banco = {
            id:data.idBanco,
            nombre: this.obtenerNombreBancoPorId(data.idBanco!)
          }
          this.listaAbonos.push(data)
          this.totalAbonosReserva = this.listaAbonos.reduce((acumulador, transaccion) => acumulador + transaccion.valor!, 0);
          this.limpiarDatos();
        } 
      },
      (error) => {
        this.dialog = {
          color: 'red',
          icon : 'pi pi-times-circle',
          title: 'Error crear abono',
          message: error.error.msg,
          visible: true
        }
      }
    );
  }

  delateAbono(idAbono: number) {
    this.listadoReservaService.deleteAbonoReserva(idAbono).subscribe(
      () => {
        const index = this.listaAbonos.findIndex(
          (data) => data.id === idAbono
        );
        this.listaAbonos.splice(index, 1);
        this.totalAbonosReserva = this.listaAbonos.reduce((acumulador, transaccion) => acumulador + transaccion.valor!, 0);
      },
      (error) => {
        console.error('Error en la peticion: ', error);
      }
    );
  }

  getAbonos() {
    this.listadoReservaService
      .getAllAbonoReservasByReserva(this.idReserva!)
      .subscribe(
        (data) => {
          this.listaAbonos = data;
          this.totalAbonosReserva = this.listaAbonos.reduce((acumulador, transaccion) => acumulador + transaccion.valor!, 0);
        },
        (error) => {
          console.error('Error en la peticion: ', error);
        }
      );
  }

  getBancos() {
    this.bancoService
      .getBancos()
      .pipe(
        map((bancos) => {
          return bancos.map((banco) => ({
            label: banco.nombre,
            value: {
              id: banco.id,
              nombre: banco.nombre,
            },
          }));
        })
      )
      .subscribe(
        (data) => {
          this.bancos = data;
        },
        (error) => {
          console.error('Error en la peticion: ', error);
        }
      );
  }

  onClickAddAbono() {
    if (this.validarFormulario()) {
      const valorPendiente = this.reserva[0].DetalleReserva?.valor!-this.totalAbonosReserva;
      if(this.datosAbono.valor! > valorPendiente){
        this.dialog = {
          color: 'red',
          icon : 'pi pi-times-circle',
          title: 'Error agregar abono',
          message: "El valor de la consignacion super el valor pendiente.",
          visible: true
        }
      }else{
        this.createAbono(this.datosAbono);
      }
    }
  }

  onClickConfirmarReserva(){
    console.log("Hola")
    this.confirmationService.confirm({
      key: 'confirmarEliminar',
      message: '¿Seguro quiere confirmar la reserva?',
      accept: () => {
        this.confirmarPreReserva(this.idReserva!);
      },
    });
  }


  confirmarEliminar(idAbono: number) {
    this.confirmationService.confirm({
      key: 'confirmarEliminar',
      message: '¿Seguro quiere elimiar este abono?',
      accept: () => {
        this.delateAbono(idAbono);
      },
    });
  }

  onClickCancelarReserva() {
    this.confirmationService.confirm({
      key: 'confirmarEliminar',
      message: '¿Seguro quiere cancelar la reserva?',
      accept: () => {
        this.cancelarPreReserva(this.idReserva!);
      },
    });
  }

  obtenerNombreBancoPorId(id: number): string {
    const bancoEncontrado = this.bancos.find((banco) => banco.value.id === id);
  
    return bancoEncontrado ? bancoEncontrado.value.nombre : "";
  }

  tieneError(controlName: string, errorName: string): boolean {
    const control = this.formulario?.form.controls[controlName];
    return control?.hasError(errorName) || false;
  }

  validarFormulario(): boolean {
    let isValid = true;
    if (this.datosAbono.Banco?.id === undefined || this.datosAbono.Banco?.id <= 0) {
      this.formulario.form.controls['bancos'].setErrors({
        incorrect: true,
      });
      isValid = false;
    }

    if (this.datosAbono.numeroConsignacion === undefined || this.datosAbono.numeroConsignacion < 0) {
      this.formulario.form.controls['numConsignacion'].setErrors({
        incorrect: true,
      });
      isValid = false;
    }

    if (!this.datosAbono.valor || this.datosAbono.valor < 0) {
      this.formulario.form.controls['valConsignacion'].setErrors({
        incorrect: true,
      });
      isValid = false;
    }

    if (
      !this.datosAbono.fechaDate ||
      this.datosAbono.fechaDate.toString().trim().length === 10 ||
      this.validarFormatoFecha(this.datosAbono.fechaDate.toString().trim())
    ) {
      this.formulario.form.controls['fecha'].setErrors({
        incorrect: true,
      });
      isValid = false;
    }

    if (
      !this.datosAbono.observaciones ||
      this.datosAbono.observaciones.trim() === ''
    ) {
      this.formulario.form.controls['observaciones'].setErrors({
        incorrect: true,
      });
      isValid = false;
    }

    if (!this.datosAbono.imgBase64 || this.datosAbono.imgBase64.trim() === '') {
      this.errorImg = true;
      isValid = false;
    } else {
      this.errorImg = false;
    }
    return isValid;
  }

  validarFormatoFecha(fecha: string): boolean {
    const patron = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return patron.test(fecha);
  }

  onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  manejadorArchivoSeleccionado(event: any) {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.datosAbono.imgBase64 = reader.result as string;
      this.errorImg = false;
    };
    reader.readAsDataURL(file);

  }

  limpiarDatos() {
    this.datosAbono = {};
    this.fileUpload1.clear();
  }
}
