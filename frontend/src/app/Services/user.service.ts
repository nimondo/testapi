import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const  APIUrlUser ="http://localhost:8080/api/users";
const  APIUrlAuth =" http://localhost:8080/api/users/login";

@Injectable({
  providedIn: 'root'
})
export class UserService  extends DataService{
  apiUrl: string = environment.apiUrl;
  constructor(http:HttpClient,private httpPrivate : HttpClient){
    super(`${environment.apiUrl}auth/signup`,http);
  }

  // Login Method
  signIn(data :{email : string,password : string}): Observable<any>{
    console.log(data)
    return this.httpPrivate.post(`${this.apiUrl}auth/login`, data);
  }
}
