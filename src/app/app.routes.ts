import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SalaComponent } from './pages/sala/sala.component';
import { CarteleraComponent } from './pages/cartelera/cartelera.component';
import { DulceriaComponent } from './pages/dulceria/dulceria.component';

export const routes: Routes = [

     { path: '', component: InicioComponent },
     { path: 'sala', component: SalaComponent },
     { path: 'cartelera', component: CarteleraComponent },
     { path: 'dulceria', component: DulceriaComponent }


];
