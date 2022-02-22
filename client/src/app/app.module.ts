import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbDialogModule, NbToastrModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask'
import { DatePipe } from '@angular/common';
import { CnpjPipe } from './modules/shared/pipes/cnpj.pipe';
import { ZipCodePipe } from './modules/shared/pipes/zip-code.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ZipCodePipe,
    CnpjPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NbLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NgxMaskModule.forRoot()
  ],
  providers: [DatePipe, CnpjPipe, ZipCodePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
