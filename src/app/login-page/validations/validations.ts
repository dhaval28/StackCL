import { AbstractControl } from '@angular/forms';

export function validatePassword(control: AbstractControl) {
  if (control.value.length > 0 && control.value.length < 8) {
    return { invalidPass: true };
  }
  return null;
}

export function validateUserName(control: AbstractControl) {
  if (control.value.length > 0 && control.value.length < 6) {
    return { invalidUsername: true };
  }
  return null;
}