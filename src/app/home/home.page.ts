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

  public _d;
  public _c;
  public _dIdentifiant;
  public _cIdentifant;
  private versionDure: string = "e";
  private versionScan;
 

  constructor(private _data: DataService) {}

  ngOnInit(){}

  

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      console.log('Console.log - checkPermission');
      if (status.granted) {
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
      BarcodeScanner.hideBackground();
      
      const result = await BarcodeScanner.startScan();
      console.log('Console.log - startScanner - before if');


      if (result.hasContent) {
        this.scanActive = false;

        this._data.getData(result.content)
      .subscribe(_data => {
        this._d = _data;
        console.log('Console.log - startScanner - before2 if' + this._d);
        this.versionCheck(result.content, this._d)
      });

    
    
    //alert(result.content); //The QR content will come out here
    //Handle the data as your heart desires here
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
versionCheck(_content, _database ){
  this._c = _content;
  this._d = _database;
  this._cIdentifant = this._c.substr(-1);
  this._dIdentifiant = this._d.data[0].versions[this._d.data[0].versions.length -1].identifiant
    console.log("Console.log - VersionCheck _c " + this._c);
    console.log("Console.log - VersionCheck _d " + this._d);
    console.log("Console.log - VersionCheck _cIndentifiant " + this._cIdentifant);
    console.log("Console.log - VersionCheck _dIdentifiant " + this._dIdentifiant);


    if (this._cIdentifant === this._dIdentifiant){
      alert("ok")
    }else{
      alert("not")
    }

  }

  //   buttonData(){
  //   this._data.getData(this.versionDure)
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