import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Registro } from './pages/registro/registro';
import { InicioSesion } from './pages/inicio-sesion/inicio-sesion';
import { Contenido } from './pages/contenido/contenido';
import { HacerDonacion } from './pages/hacer-donacion/hacer-donacion';
import { Postulacion } from './pages/postulacion/postulacion';
import { EnviarDonacion } from './pages/enviar-donacion/enviar-donacion';
import { EnviarPeticion } from './pages/enviar-peticion/enviar-peticion';
import { Nosotros } from './pages/nosotros/nosotros';
import { VerPeticiones } from './pages/ver-peticiones/ver-peticiones';
import { VerDonaciones } from './pages/ver-donaciones/ver-donaciones';
import { ActualizarPeticion } from './pages/actualizar-peticion/actualizar-peticion';
import { ActualizarDonacion } from './pages/actualizar-donacion/actualizar-donacion';
import { ActualizarUsuario } from './pages/actualizar-usuario/actualizar-usuario';
import { Envio } from './components/envio/envio';
import { authGuard } from './guardas/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'principal', component: Contenido, canActivate: [authGuard] },
  { path: 'inicio', component: Inicio, canActivate: [authGuard] },
  { path: 'ingresar', component: InicioSesion, canActivate: [authGuard] },
  { path: 'registro', component: Registro, canActivate: [authGuard] },
  { path: 'inicio/hacer-donacion', component: HacerDonacion, canActivate: [authGuard] },
  { path: 'postulacion', component: Postulacion, canActivate: [authGuard] },
  { path: 'enviar-donacion/:id/:categoriaId', component: EnviarDonacion, canActivate: [authGuard] },
  { path: 'inicio/hacer-peticion', component: EnviarPeticion, canActivate: [authGuard] },
  { path: 'inicio/ver-peticiones', component: VerPeticiones, canActivate: [authGuard] },
  { path: 'ver-peticion/detalles/:id', component: ActualizarPeticion, canActivate: [authGuard] },
  { path: 'inicio/ver-donaciones', component: VerDonaciones, canActivate: [authGuard] },
  { path: 'ver-donacion/detalles/:id', component: ActualizarDonacion, canActivate: [authGuard] },
  { path: 'usuarios/actualizar/:id', component: ActualizarUsuario, canActivate: [authGuard] },
  { path: 'nosotros', component: Nosotros, canActivate: [authGuard] },
  { path: 'inicio/envio', component: Envio, canActivate: [authGuard] },
  { path: '**', redirectTo: 'principal', pathMatch: 'full' }
];




