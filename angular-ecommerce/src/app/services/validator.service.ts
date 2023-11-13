import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  public noWhitespaceValidator(control: AbstractControl) {
    return (control.value || '').trim().length? null : { 'whitespace': true };       
  } 
}
