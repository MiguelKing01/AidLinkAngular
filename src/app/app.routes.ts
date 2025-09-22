import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Registro } from './pages/registro/registro';
import { InicioSesion } from './pages/inicio-sesion/inicio-sesion';
import { Contenido } from './pages/contenido/contenido';
import { HacerDonacion } from './pages/hacer-donacion/hacer-donacion';
import { Postulacion } from './pages/postulacion/postulacion';
import { EnviarDonacion } from './pages/enviar-donacion/enviar-donacion';
import { EnviarPeticion } from './pages/enviar-peticion/enviar-peticion';
import { authGuard } from './guardas/auth-guard';
import { Nosotros } from './pages/nosotros/nosotros';

export const routes: Routes = [
    { path: '', component:Contenido },
    { path: 'inicio', component:Inicio },
    { path: 'ingresar', component:InicioSesion },
    { path: 'registro', component:Registro},
    { path: 'inicio/hacer-donacion', component:HacerDonacion },
    { path: 'postulacion', component:Postulacion },
    { path: 'enviar-donacion/:id/:categoriaId', component:EnviarDonacion },
    { path: 'inicio/hacer-peticion', component:EnviarPeticion },
    { path: 'nosotros', component: Nosotros}
];
