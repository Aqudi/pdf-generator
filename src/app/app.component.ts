import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
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
      this.capturedImage = canvas.toDataURL("image/png");
      // console.log("canvas.toDataURL() -->" + this.capturedImage);
      // this will contain something like (note the ellipses for brevity), console.log cuts it off 
      // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAa0AAAB3CAYAAACwhB/KAAAXr0lEQVR4Xu2dCdiNZf7HP/ZQkpQtaUxDjYYoTSYlURMhGlmKa..."

      canvas.toBlob(function (blob) {
        //  just pass blob to something expecting a blob
        // somfunc(blob);

        // Same as canvas.toDataURL(), just longer way to do it.
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          let base64data = reader.result;
          console.log("Base64--> " + base64data);
        }
      });
    });
  }

  printPdf() {
    html2canvas(document.querySelector("#capture")).then(canvas => {
      // 캔버스를 이미지로 변환
      var imgData = canvas.toDataURL('image/png');

      var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
      var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var doc = new jsPDF('p', 'mm');
      var position = 0;

      // 첫 페이지 출력
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 한 페이지 이상일 경우 루프 돌면서 출력
      while (heightLeft >= 20) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // 파일 저장
      doc.save('sample.pdf');

      //이미지로 표현
      //document.write('<img src="'+imgData+'" />');
    })
  }
}
