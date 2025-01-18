import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(credentials: any) {
    console.log(credentials, "desde el servicio");
    return new Promise((resolve, reject) => {
      if (credentials.email === 'yuleidisavilezm@gmail.com' && credentials.password === '123456789') {
        resolve('login correcto');
      } else {
        reject('login incorrecto');
      }
    });
  }
}
