// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Shared/header/header.component';
import { FooterComponent } from './Components/Shared/footer/footer.component';
import { GameBodyComponent } from './Components/game-body/game-body.component';
import { MatrialModule } from './Modules/angular-matrial/angular-matrial.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GameBodyComponent
  ],
  imports: [
    BrowserModule,
    SweetAlert2Module.forRoot(),
    MatrialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
