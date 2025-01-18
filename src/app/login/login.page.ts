
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'
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
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage
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
  
  loginUser(credentials: any){
    this.authService.login(credentials).then(res =>{
      console.log(res);
      this.errorMessage = '';
      this.storage.set('isUserLoggedIn',true);
     this.navCtrl.navigateForward('/home');
    }).catch(err =>{
      console.log(err);
      this.errorMessage = err;
    });
  }

}
