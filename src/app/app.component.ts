import { Component } from '@angular/core';
import * as fileUpload from 'fuctbase64';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meinkurs';
  fileResult;
  myFile;

  constructor(private sanitizer: DomSanitizer) {}

  onFileChange(event) {
    let result = fileUpload(event);
    this.fileResult = result;
  }

  ver() {
    let mySrc = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.fileResult.__zone_symbol__value.base64);
    this.myFile = mySrc;
    // this.getImage(this.myFile);
  }

}
