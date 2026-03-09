import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SalaComponent } from './pages/sala/sala.component';
import { CarteleraComponent } from './pages/cartelera/cartelera.component';
import { DulceriaComponent } from './pages/dulceria/dulceria.component';
import { PeliculaDetalleComponent } from './pages/pelicula-detalle/pelicula-detalle.component';
import { SeleccionFuncionComponent } from './pages/seleccion-funcion/seleccion-funcion.component';
import { SeleccionAsientosComponent } from './pages/seleccion-asientos/seleccion-asientos.component';
import { TipoEntradaComponent } from './pages/tipo-entrada/tipo-entrada.component';
export const routes: Routes = [

     { path: '', component: InicioComponent },
     { path: 'sala', component: SalaComponent },
     { path: 'cartelera', component: CarteleraComponent },
     { path: 'dulceria', component: DulceriaComponent },
     { path: 'pelicula/:id', component: PeliculaDetalleComponent },
     { path: 'seleccion-funcion/:id', component: SeleccionFuncionComponent },
     { path: 'seleccion-asientos/:id', component: SeleccionAsientosComponent },
     { path: 'tipo-entrada', component: TipoEntradaComponent }


];
