import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import { AppComponent } from './app.component';
import { ToastOptionsCustom } from './toast.options.custom';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, ToastModule.forRoot()
  ],
  providers: [{provide: ToastOptions, useClass: ToastOptionsCustom}],
  bootstrap: [AppComponent]
})
export class AppModule { }
