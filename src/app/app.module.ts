import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ShareComponent } from './components/share.component';
import { SnapComponent } from './components/snap.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CameraService } from './camera.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';


const appRoutes: Routes = [
  { path: '', component: SnapComponent },
  { path: 'share', component: ShareComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent, ShareComponent,SnapComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes), MaterialModule,
    WebcamModule, ReactiveFormsModule
  ],
  providers: [CameraService],
  bootstrap: [AppComponent]
})

export class AppModule { }
