import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = { headers: new HttpHeaders({'Content-Type': 'application/json' })};

  constructor(
    private http: HttpClient
  ) { }
  login(credentials: any){
    return new Promise ((accept, reject) => {
      let params = {
        "user": { 
          "email": credentials.email,
          "password": credentials.password
         }
      }
      this.http.post(`${this.urlServer}/login`, params, this.httpHeaders).subscribe(
        (data:any)=>{
          console.log(data);
          if(data.status == 'OK'){
            accept(data);
          }else{
            reject(data.errors);
          }
        },
        (error) => {
          console.log(error);
          if (error.status == 422 ){
            reject('Usuario o contraseña incorrectos');
          }else if (error.status == 500){
            reject('Error Por favor intenta mas tarde');
          }else{
            reject('Error al intentar iniciar sesión');
          }
        }
      )
    });
  }
  register(data:any){
    return new Promise(( accept, reject) => {
      let params = {
        "user":{
          "name": data.name,
          "last_name": data.lastname,
          "username": data.username,
          "email": data.email,
          "password": data.password,
          "password_confirmation": data.password_confirmation
        }
      }
      this.http.post(`${this.urlServer}/signup`, params, this.httpHeaders).subscribe(
        (data: any) => {
          console.log(data);
          if(data.status == 'OK'){
            accept(data);
          }else{
            reject(data.errors);
          }
        },
        (error) => {
          console.log(error);
          if (error.status == 422 ){
            reject(error.error.error);
          }else if (error.status == 500){
            reject('Error Por favor intenta mas tarde');
          }else{
            reject('Error al intentar registrarte');
          }
        }
      )
    });
  }
}