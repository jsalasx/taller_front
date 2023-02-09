import { Component, OnInit } from '@angular/core';
import { MantenimientoI } from '../interfaces/MantenimientosInterfaz';
import { MantenimientoService } from '../servicios/mantenimiento/mantenimiento.service';
import { RespuestaMantenimientoI } from '../interfaces/RespuestaMantenimiento';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {

  mantenimientos: Array<MantenimientoI> = [];
  errorStatus: boolean = false;
  errorMsj:any = "";
  errorStatusModal: boolean = false;
  errorMsjModal:any = "";
  horario: Array<String> = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00"]

  closeResult = '';
  formNuevoMantenimiento = new FormGroup({
    placa: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
    tipoVehiculo: new FormControl('', Validators.required),
    cliente: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    observacion: new FormControl(''),
  })

  formBuscarPorPlaca = new FormGroup({
    placa: new FormControl('', Validators.required)
  })
constructor(private mantenimientoService: MantenimientoService, private modalService: NgbModal) { }
ngOnInit(): void {

  this.getAllMantenimientos();
  }

  getAllMantenimientos () {
     this.mantenimientoService.getAllMantenimientos().subscribe((data:RespuestaMantenimientoI) => {
    console.log(data);
    if(data.obj==null) {
    } else {
      this.mantenimientos = data.obj;
    }
   })
  }

  	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result: any) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason: any) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}


  guardarMantenimiento() {
    let mantenimiento:MantenimientoI = {
      fechaMantenimiento: this.formNuevoMantenimiento.value.fecha + " " + this.formNuevoMantenimiento.value.hora + ":00",
      observacion: this.formNuevoMantenimiento.value.observacion || "",
      placa: this.formNuevoMantenimiento.value.placa || "",
      estado: "PROGRAMADA",
      cliente: this.formNuevoMantenimiento.value.cliente || "",
      telefono: this.formNuevoMantenimiento.value.telefono || "",
      tipoVehiculo: this.formNuevoMantenimiento.value.tipoVehiculo || ""
    }

    this.mantenimientoService.guardarMantenimiento(mantenimiento).subscribe((data:RespuestaMantenimientoI) => {
      console.log(data);
      if (data.obj == null) {
        this.errorStatusModal = true;
        this.errorMsjModal = data.errorMsg;
      } else {
        this.errorStatus = false;
        this.errorMsj = "";
        this.getAllMantenimientos();
        this.modalService.dismissAll();
      }

    })
  }

  campoInvalido(campo:any) {
    return this.formNuevoMantenimiento.get(campo)?.invalid  && this.formNuevoMantenimiento.get(campo)?.touched
  }

  buscarPorPlaca() {
    this.errorStatus = false;
        this.errorMsj = "";
    let mantenimiento:MantenimientoI = {
      placa: this.formBuscarPorPlaca.value.placa || "",
    }

    if(mantenimiento.placa == "" ||  mantenimiento.placa == undefined) {
       this.getAllMantenimientos();
    }else {    this.mantenimientoService.buscarPorPlaca(mantenimiento).subscribe((data:any) => {
      console.log(data);
      if(data.obj == null) {
        this.mantenimientos = [];
        this.errorStatus = true;
        this.errorMsj = "No existe citas"
      } else {

        this.mantenimientos = [];
        this.mantenimientos.push(data.obj);
      }
    })
  }
  }

  cambiarEstado(id?:string) {
    let mantenimiento:MantenimientoI = {
      id
    }
    this.mantenimientoService.cambiarEstadoPorId(mantenimiento).subscribe((data:RespuestaMantenimientoI) => {
      console.log(data);
      if(data.obj == null) {

      } else {
        this.getAllMantenimientos();
      }
    })
  }

}
