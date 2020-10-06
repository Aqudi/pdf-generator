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
}
