import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Subscriber } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  scanActive: boolean = false;

  public d;
  private versionDure: string = "e";
  private versionScan;
 

  constructor(private _data: DataService) {}

  ngOnInit(){}

  

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        console.log('Console.log - checkPermission1');
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }
  
  async startScanner() {
    const allowed = await this.checkPermission();



    
    if (allowed) {
      this.scanActive = true;
      console.log('Console.log - startScanner');
      // this.data();
      BarcodeScanner.hideBackground();
      
      const result = await BarcodeScanner.startScan();
      
      
      if (result.hasContent) {
        this.scanActive = false;
        alert(result.content); //The QR content will come out here
        //Handle the data as your heart desires here

        // This is true function for to make a GET with SCANNER
        // this._data.getData(result.content)
        //   .subscribe(_data => {
        //     console.log(_data);
        //     this.versionCheck(_data);
        //   }
        //   )
        
      } else {
        alert('NO DATA FOUND!');
      }
    } else {
      alert('NOT ALLOWED!');
    }
  }
  
  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }
  
  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }
  // This function going to check the last version in the database
  versionCheck(_d ){
    console.log("versionCheck1 " + _d);
    console.log("versionCheck2 " + this.d.data[0].versions[this.d.data[0].versions.length -1].identifiant);
    
    this.versionScan = this.d.data[0].versions[this.d.data[0].versions.length -1].identifiant
    console.log("versionScan " + this.versionScan);
    console.log("versionDure " + this.versionDure);
  

    if (this.versionScan === this.versionDure){
      alert("ok")
    }else{
      alert("not")
    }

  }

    buttonData(){
    this._data.getData(this.versionDure)
    // .subscribe(data => this.d = data + console.log("hello" + this.d) );
    .subscribe(_data => {
      this.d = _data;
      console.log('Console.log - buttonData');
      console.log("ButtonData " + this.d.data[0].versions[this.d.data[0].versions.length -1]._id.substring(0,24));

      // With under console.log you must change url "http://bsm-ws.herokuapp.com/documents" in data.service.ts
      //console.log("ButtonData " + this.d.data[this.d.data.length -1].versions[0]._id);
      
      this.versionCheck(_data);
     
      });
  }
  
  // buttonData(){
  //   this._data.getData()
  //   // .subscribe(data => this.d = data + console.log("hello" + this.d) );
  //   .subscribe(_data => {
  //     this.d = _data;
  //     console.log('Console.log - buttonData');
  //     console.log("ButtonData " + this.d.data[0].versions[this.d.data[0].versions.length -1]._id.substring(0,24));

  //     // With under console.log you must change url "http://bsm-ws.herokuapp.com/documents" in data.service.ts
  //     //console.log("ButtonData " + this.d.data[this.d.data.length -1].versions[0]._id);
      
  //     this.versionCheck(_data);
     
  //     });
  // }

  // data(){
  //   this._data.getData()
  //   // .subscribe(data => this.d = data + console.log("hello" + this.d) );
  //   .subscribe(_data => {
  //     this.d = _data;
  //     console.log('Console.log - datat');
  //     console.log(this.d);
  //     });
  // }

 

}