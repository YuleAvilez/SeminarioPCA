import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

defineCustomElements(window);
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {
  user_data: any = {
    name: '',
    email: '',
    image: '',
    followees: [],
    followers: [],
    
  };
  
  isEditingUsername: boolean = false;  // Bandera para controlar la edición
  newUsername: string = '';
  constructor(
    private userService: UserService,
    private storage: Storage,
    public alertController: AlertController,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    console.log(user, "usuario");
    this.userService.getUser(user.id).then(
      (data: any) => {
        console.log(data);
        this.storage.set('user', data);
        this.user_data = data;
      }
    ).catch(
      (error) => {
        console.log(error);
      });
  }

  async takePhoto(source: CameraSource) {
    console.log('Take Photo');
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
      quality: 100
    });
    console.log(capturedPhoto.dataUrl);
    this.user_data.image = capturedPhoto.dataUrl;
    this.update();
  }

  async update() {
    this.userService.updateUser(this.user_data).then(
      (data) => {
        console.log(data);
      }
    ).catch(
      (error) => {
        console.log(error);
      });
  }

  async presentPhotoOptions() {
    const alert = await this.alertController.create({
      header: "Seleccione una opción",
      message: "¿De dónde desea obtener la imagen?",
      buttons:[
        {
          text: "Cámara",
          handler: () => {
            this.takePhoto(CameraSource.Camera);
          }
        },
        {
          text: "Galería",
          handler: () => {
            this.takePhoto(CameraSource.Photos);
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    });
    await alert.present();
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
  
    startEditing() {
      this.isEditingUsername = true;
      this.newUsername = this.user_data.username;
    }
  
    async saveUsername() {
      if (!this.user_data.id) {
        this.showToast("Error: El ID del usuario no está definido.", "danger");
        return;
      }
    
      if (this.newUsername.trim() !== "") {
        this.user_data.username = this.newUsername;
        this.isEditingUsername = false;
    
        try {
          const updatedData = { id: this.user_data.id, username: this.newUsername };
          await this.userService.updateUser(updatedData);
          
          await this.storage.set('user', this.user_data);
    
          this.showToast("Nombre de usuario actualizado correctamente.", "success");
        } catch (error) {
          this.showToast("Error al actualizar el nombre de usuario.", "danger");
        }
      }
    }
    
    
  
    cancelEditing() {
      this.isEditingUsername = false;
    }

}