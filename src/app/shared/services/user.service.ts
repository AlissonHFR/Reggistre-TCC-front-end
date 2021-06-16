import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from 'src/app/views/login/services/storage.service';
@Injectable()
export class UserService extends ApiService {
  constructor(private _http: HttpClient, private _storage: StorageService) {
    super(_http, _storage, 'user');
  }
}