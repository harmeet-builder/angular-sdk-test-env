import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Content } from '@builder.io/sdk-angular';
import { AppComponent, HelloComponent, TodoComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, TodoComponent, HelloComponent],
  imports: [Content, BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
