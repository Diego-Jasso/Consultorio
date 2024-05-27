import { NgForm } from "@angular/forms";

export function validarCamposRequeridos(formulario: NgForm): void {
  Object.keys(formulario.controls).forEach((nombre) => {
    const control = formulario.controls[nombre];
    control.markAsTouched({ onlySelf: true });
    control.markAsDirty({ onlySelf: true });
  });
}
