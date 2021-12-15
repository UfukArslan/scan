import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _url: string = "http://bsm-ws.herokuapp.com/documents/?_id=61b4d862b2cba600168538f4-C";
  private _urls: string = this._url.substring(0,67);

  constructor(private http: HttpClient) { }
  
  
  // getData used for test
  getData(): Observable<any>{
    console.log("getData " + this._urls);
    return this.http.get(this._urls)
  }

  // getData(): Observable<any>{
  //   console.log("getData " + this._urls);
  //   return this.http.get(this._urls)
  // }

  //This funciton for startScanner
  // getData(_id): Observable<any>{
  //   return this.http.get(this._url+_id.substing(0,24))
  // }
}
