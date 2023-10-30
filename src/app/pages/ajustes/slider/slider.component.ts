import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { map } from 'rxjs';
import { Slider } from 'src/app/models/slider.model';
import { SliderService } from 'src/app/services/slider.service';

@Component({
  templateUrl: './slider.component.html',
  providers: [ConfirmationService],
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
    @ViewChild('filter') filter!: ElementRef;
    titulo?: string;
    postOput: boolean = true;
    display: boolean = false;
    loading: boolean = true;
    sliders: Slider[] = [];
    sliderSeleccionado: Slider = {};
    estados: SelectItem[] = [];
    estadoSeleccionado?: boolean;

    constructor(
        private sliderService: SliderService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.estados = [
            { label: 'Activo', value: true },
            { label: 'Inactivo', value: false },
        ];
        this.getSliders();
    }

    getSliders() {
        this.sliderService.getSliders().subscribe(
            (data) => {
                this.sliders = data;
                this.loading = false;
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createSlider() {
        this.sliderSeleccionado.estado = this.estadoSeleccionado;
        this.sliderService
            .createSlider(this.sliderSeleccionado)
            .subscribe(
                (data) => {
                    this.sliderSeleccionado.id = data.id;
                    this.sliderSeleccionado.urlImagen = data.urlImagen;
                    this.sliders.push(this.sliderSeleccionado);
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
        this.display = false;
    }

    updateSlider(slider: Slider) {
        this.sliderSeleccionado.estado = this.estadoSeleccionado;
        this.sliderService.updateSlider(slider).subscribe(
            (data) => {
                const indexSlider = this.sliders.findIndex(
                    (res) => res.id === slider.id
                );
                this.sliders[indexSlider] = {
                    id: data.id,
                    nombre: data.nombre,
                    estado: data.estado,
                    urlImagen: data.urlImagen,
                };
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    deleteSlider(idSlider: number) {
        this.sliderService.deleteSlider(idSlider).subscribe(
            () => {
                const index = this.sliders.findIndex(
                    (data) => data.id === idSlider
                );
                this.sliders.splice(index, 1);
            },
            (error) => {
                console.error('Error en la peticion: ', error);
            }
        );
    }

    createOrUpdate() {
        if (this.sliderSeleccionado !== undefined) {
            if (this.postOput) {
                this.createSlider();
            } else {
                this.updateSlider(this.sliderSeleccionado);
            }
            this.display = false;
        }
    }

    confirmarEliminar(idSlider: number) {
        this.confirmationService.confirm({
            key: 'confirmarEliminar',
            message: '¿Seguro quiere elimiar este slider?',
            accept: () => {
                this.deleteSlider(idSlider);
            },
        });
    }

    openDialogCreate() {
        this.titulo = 'Crear slider';
        this.sliderSeleccionado = {};
        this.estadoSeleccionado = true;
        this.display = true;
        this.postOput = true;
    }

    openDialogUpdate(idSlider: number) {
        this.titulo = 'Actualizar slider';
        const index = this.sliders.findIndex(
            (data) => data.id === idSlider
        );
        this.sliderSeleccionado = this.sliders[index];
        this.display = true;
        this.postOput = false;
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

    manejadorArchivoSeleccionado(event: any) {
        const file = event.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.sliderSeleccionado.imgBase64 = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
}
