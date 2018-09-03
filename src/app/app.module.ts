import { NgxFloatBallModule } from './../../projects/ngx-float-ball/src/lib/ngx-float-ball.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxFloatBallModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
