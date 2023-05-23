import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuthLevel: string[] = ["USER", "MOD", "ADMIN"];
  modAuthLevel: string[] = ["MOD", "ADMIN"];
  adminAuthLevel: string[] = ["ADMIN"];

  constructor() {}

  setDataInLocalStorage(variableName: any, data: any) {
      localStorage.setItem(variableName, data);
  }

  getUserDetails() {
    return localStorage.getItem('userData');
  }

  getToken() {
      return localStorage.getItem('token');
  }

  getRememberMe() {
    return localStorage.getItem('rememberMe');
  }

  clearStorage() {
      localStorage.clear();
  }

  checkAuthLevel(minAuthLevelRequired: string){

    const actualUserLevel = this.getToken();

    switch(minAuthLevelRequired){
      case undefined: return true; break;
      case this.userAuthLevel[0]: return this.userAuthLevel.includes(actualUserLevel); break;
      case this.modAuthLevel[0]: return this.modAuthLevel.includes(actualUserLevel); break;
      case this.adminAuthLevel[0]: return this.adminAuthLevel.includes(actualUserLevel); break;
      default: return false;
    }

  }
}
