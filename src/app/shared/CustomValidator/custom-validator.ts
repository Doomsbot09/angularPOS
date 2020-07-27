import { AbstractControl } from "@angular/forms";

export function ValidateInput(control: AbstractControl){
    if((control.value * 10) % 2 == 0){
        return null
    } else {
        return { 'InvalidInput': true }
    }
}
