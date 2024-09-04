import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_MESSAGES } from '../../utils/messages';

@Component({
  selector: 'app-conctact',
  templateUrl: './conctact.component.html',
  styleUrls: ['./conctact.component.css'],
})
export class ConctactComponent {
  contactInfo = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    reason: '',
  };

  private _snackbar = inject(MatSnackBar);
  private validFormMessage = APP_MESSAGES.SUCCESS_INFO;
  private invalidFormMessage = APP_MESSAGES.INVALID_FORM;

  constructor() {}

  resetForm() {
    this.contactInfo = {
      name: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      reason: '',
    };
  }

  openSnackBar(message: string, action = 'x') {
    this._snackbar.open(message, action, {
      duration: 2000,
    });
  }

  isFormValid(formData: NgForm) {
    return formData.valid;
  }

  onSubmit(formData: NgForm) {
    const isValid = this.isFormValid(formData);
    if (!isValid) {
      this.openSnackBar(this.invalidFormMessage);
      return;
    }
    console.log('Form Contact data:', {
      name:
        this.contactInfo.name.charAt(0).toUpperCase() +
        this.contactInfo.name.slice(1),
      lastName:
        this.contactInfo.lastName.charAt(0).toUpperCase() +
        this.contactInfo.lastName.slice(1),
      email: this.contactInfo.email,
      phone: this.contactInfo.phone,
      message: this.contactInfo.message,
      reason: this.contactInfo.reason.toUpperCase(),
    });
    this.openSnackBar(this.validFormMessage);
    this.resetForm();
  }
}
