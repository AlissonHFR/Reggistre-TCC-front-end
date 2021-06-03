import { Injectable } from '@angular/core';
import { IUserData } from './dtos/IUserData';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  user: IUserData;

  constructor() {
    const storagedData = localStorage.getItem('@reggistre:user');
    if (!storagedData) {
      this.user = {} as IUserData;
      return;
   }

   this.user =JSON.parse(storagedData);
  }

  setUser(data: IUserData) {
    this.user = data;
    localStorage.setItem('@reggistre:user', JSON.stringify(data));
  }

  updateUser(data: IUserData) {
    this.user = data;
    localStorage.setItem('@reggistre:user', JSON.stringify(data));
  }

  removeUser() {
    localStorage.removeItem('@reggistre:user');
    this.user = {} as IUserData
  }

  logout() {
    this.removeUser();
  }  
}
