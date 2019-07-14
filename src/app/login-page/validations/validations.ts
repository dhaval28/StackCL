import { AbstractControl, FormGroup } from '@angular/forms';

export function validatePassword(control: AbstractControl) {
  if (control.value && control.value.length > 0 && control.value.length < 8) {
    return { invalidPass: true };
  }
  return null;
}

export function validateUserName(control: AbstractControl) {
  if (control.value && control.value.length > 0 && control.value.length < 6) {
    return { invalidUsername: true };
  }
  return null;
}

export function checkPasswords(group: FormGroup) {
  let pass = group.controls.newPassword.value;
  let confirmPass = group.controls.confirmPassword.value;

  return pass === confirmPass ? null : { notSame: true } 
}