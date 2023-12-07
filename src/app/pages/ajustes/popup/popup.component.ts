import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { PopUp } from 'src/app/models/popup.model';
import { PopupService } from 'src/app/services/popup.service';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  providers: [ConfirmationService],
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
    @ViewChild('fileUpload') fileUpload1!: FileUpload;
    popUp:PopUp = {urlImagen:''};
    titleButton : string = "Modificar";

    constructor(
        private confirmationService: ConfirmationService,
        private popUpService: PopupService,
    ) {}

    ngOnInit(): void {
        this.getPopUp();
    }

    getPopUp() {
        this.popUpService
            .getPopUp()
            .subscribe(
                (data) => {
                    if(!data){
                        this.popUp.urlImagen = './../../../../assets/images-rota.png';
                    }else{
                        this.popUp = data;
                    }


                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    createPopUp(){
        if(this.popUp.imgBase64){
            this.popUpService
            .createPopUp(this.popUp)
            .subscribe(
                (data) => {
                    this.popUp = data;                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
        }
    }

    deletePopUp(){
        this.popUpService
            .deletePopUp(this.popUp.id!)
            .subscribe(
                (data) => {
                    this.popUp.urlImagen = './../../../../assets/images-rota.png';
                    this.popUp.imgBase64 = undefined;
                },
                (error) => {
                    console.error('Error en la peticion: ', error);
                }
            );
    }

    confirmarEliminar() {
        this.confirmationService.confirm({
            key: 'confirmarEliminar',
            message: '¿Seguro quiere elimiar este popup?',
            accept: () => {
                this.deletePopUp();
            },
        });
    }

    manejadorArchivoSeleccionado(event: any) {
        const file = event.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.popUp.imgBase64 = reader.result as string;
        };
        reader.readAsDataURL(file);

    }
}
