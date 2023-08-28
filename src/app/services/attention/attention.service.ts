import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttentionService {

  constructor(private http: HttpClient) { }
  URL_BASE = environment.URL_DENTAL + '/dental';


}
