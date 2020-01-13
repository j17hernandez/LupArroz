
import { Routes, RouterModule } from '@angular/router';
// Componentes
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';


const appRoutes: Routes = [
{ path: 'login', component: LoginComponent },
 { path: 'registrer', component: RegisterComponent },
{ path: '**', component: NopagefoundComponent},
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true} );
