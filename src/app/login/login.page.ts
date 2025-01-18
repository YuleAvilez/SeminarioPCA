
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: any;
  emailErrors = {
    email: [
      { type: 'required', message: 'el correo es obligatorio' },
      { type: 'email', message: 'el correo no es valido'}
    ]
  };
  passwordErrors = {  
    password: [
      { type: 'required', message: 'la contraseña es obligatoria' },
    ]
  }

  constructor(
    private formBuilder: FormBuilder
  )  {
    this.loginForm = this.formBuilder.group({
     email: new FormControl ('', Validators.compose ([
     Validators.required,
     Validators.email
     ])),
    password: new FormControl ('', Validators.compose([
      Validators.minLength(6),
      Validators.required
    ]))
    })
  }

  ngOnInit() {
  }

}
