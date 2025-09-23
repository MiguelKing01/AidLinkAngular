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

export const routes: Routes = [
    { path: '', component:Contenido },
    { path: 'inicio', component:Inicio },
    { path: 'ingresar', component:InicioSesion },
    { path: 'registro', component:Registro},
    { path: 'inicio/hacer-donacion', component:HacerDonacion },
    { path: 'postulacion', component:Postulacion },
    { path: 'enviar-donacion/:id/:categoriaId', component:EnviarDonacion },
    { path: 'inicio/hacer-peticion', component:EnviarPeticion },
    { path: 'inicio/ver-peticiones', component:VerPeticiones},
    { path: 'ver-peticion/detalles/:id', component:ActualizarPeticion},
    { path: 'inicio/ver-donaciones', component:VerDonaciones},
    { path: 'ver-donacion/detalles/:id', component:ActualizarDonacion},
    { path: 'usuarios/actualizar/:id', component: ActualizarUsuario},
    { path: 'nosotros', component: Nosotros},
    { path: 'inicio/envio', component: Envio}
];
