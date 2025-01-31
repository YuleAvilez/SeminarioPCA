import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: any;
  FormErros = {
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es valido' }
    ],
    password: [
      { type: 'minlength', message: 'La contraseña minimo 6 caracteres' },
      { type: 'required', message: 'La contraseña es obligatoria' }
    ]
  }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCrtl: NavController,
    private storage: Storage,
    private toastController: ToastController
  ) { 
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
    ])),
      password: new FormControl('', Validators.compose([
      Validators.minLength(6),
      Validators.required
    ]))
    })
  }

  
  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }


  ngOnInit() {
  }
  loginUser(credentials: any){
    this.authService.login(credentials).then((res: any) => {
      console.log(res);
      this.errorMessage = '';
      this.storage.set('user', res.user);
      this.storage.set('isUserloggeIn', true);
      this.navCrtl.navigateForward('/menu/home');
    }).catch(err =>{
      console.log(err);
      this.showToast("Usuario o Contraseña incorrectos", "danger")
    });
  }
}