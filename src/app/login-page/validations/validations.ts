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

export function checkUserNameAvailability(control: AbstractControl) {
  return new Promise(resolve => {

    //Fake a slow response from server

    setTimeout(() => {
      if (control.value.toLowerCase() === "greg") {

        resolve({
          "username taken": true
        });

      } else {
        resolve(null);
      }
    }, 2000);

  });
}