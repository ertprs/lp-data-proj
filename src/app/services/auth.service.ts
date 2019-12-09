import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated() {
    console.log("checked whether it is authenticated")
    let bearer = sessionStorage.getItem('bearer');
    console.log(bearer)
    if(bearer){
      return true;
    }
    else {
      return false;
    }
  }
}
