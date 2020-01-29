
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// RUTAS
// import { APP_ROUTES } from './app.routes';
import { APP_ROUTES } from './app.routes';
import { AppRoutingModule } from './app-routing.module';

// Modulos
import { PagesModule } from './pages/pages.module';
// Temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServicesModule } from './services/services.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent


  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
