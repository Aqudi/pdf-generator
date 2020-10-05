import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PdfModule } from './pdf/pdf.module';

const routes: Routes = [
  { path: '', component: AppComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PdfModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
