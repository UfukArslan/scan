import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private c;
 

  constructor(private http: HttpClient) { }
  
  
  // getData used for test
  getData(content): Observable<any>{
    console.log("Console.log content brut " + content);
    this.c = content.substring(0,67);
    console.log("Console.log content substring " + this.c);
    return this.http.get("http://bsm-ws.herokuapp.com/documents/?_id=" + this.c)
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
