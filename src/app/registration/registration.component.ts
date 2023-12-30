import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
registrationForm : FormGroup;
constructor(private fb : FormBuilder){
  this.registrationForm = this.fb.group({
    username : ['', Validators.required],
    password : ['', Validators.required],
    confirmPassword : ['', Validators.required],
    email : ['', Validators.required],
    address : ['', Validators.required],
    contactNo : ['', Validators.required],
  })
}
register(){

}
}
