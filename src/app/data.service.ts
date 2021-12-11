import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _url: string = "http://bsm-ws.herokuapp.com/documents";

  constructor(private http: HttpClient) { }

  getData(): Observable<any>{
    return this.http.get(this._url)
    
  }
}
