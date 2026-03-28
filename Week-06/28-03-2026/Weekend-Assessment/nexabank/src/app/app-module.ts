import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { App } from './app';
import { RecordTableComponent } from './components/record-table/record-table';

@NgModule({
  declarations: [
    App,
    RecordTableComponent   // ✅ stays here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [App]
})
export class AppModule {}