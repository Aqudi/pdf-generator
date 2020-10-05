import { Component } from '@angular/core';
declare let html2canvas: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pdf-generator';
  capturedImage;

  clickme() {
    html2canvas(document.querySelector("#capture")).then(canvas => {

      debugger;

      /// document.body.appendChild(canvas);
      this.capturedImage = canvas.toDataURL();
      console.log("canvas.toDataURL() -->" + this.capturedImage);
      // this will contain something like (note the ellipses for brevity), console.log cuts it off 
      // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAa0AAAB3CAYAAACwhB/KAAAXr0lEQVR4Xu2dCdiNZf7HP/ZQkpQtaUxDjYYoTSYlURMhGlmKa..."


      canvas.toBlob(function (blob) {

        //  just pass blob to something expecting a blob
        // somfunc(blob);

        // Same as canvas.toDataURL(), just longer way to do it.
        var reader = new FileReader();
        debugger;
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          let base64data = reader.result;
          console.log("Base64--> " + base64data);
        }
      });
    });
  }
}
