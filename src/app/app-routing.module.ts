import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule) },
  { path: 'perfil', loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule), canActivate: [AuthGuard] },
  { path: 'equipo', loadChildren: () => import('./pages/equipo/equipo.module').then(m => m.EquipoPageModule), canActivate: [AuthGuard] },
  { path: 'reserva', loadChildren: () => import('./pages/reserva/reserva.module').then(m => m.ReservaPageModule), canActivate: [AuthGuard] },
  { path: 'partido', loadChildren: () => import('./pages/partido/partido.module').then(m => m.PartidoPageModule), canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'club-admin',
    loadChildren: () => import('./pages/club-admin/club-admin.module').then( m => m.ClubAdminPageModule)
  },
  {
    path: 'jugador-admin',
    loadChildren: () => import('./pages/jugador-admin/jugador-admin.module').then( m => m.JugadorAdminPageModule)
  },
  {
    path: 'solicitar-partido',
    loadChildren: () => import('./pages/solicitar-partido/solicitar-partido.module').then( m => m.SolicitarPartidoPageModule)
  },
  {
    path: 'jugadores',
    loadChildren: () => import('./pages/jugadores/jugadores.module').then( m => m.JugadoresPageModule)
  },
  {
    path: 'buzon',
    loadChildren: () => import('./pages/buzon/buzon.module').then( m => m.BuzonPageModule)
  },
  {
    path: 'invitar-jugador',
    loadChildren: () => import('./pages/invitar-jugador/invitar-jugador.module').then( m => m.InvitarJugadorPageModule)
  },
  {
    path: 'invitaciones',
    loadChildren: () => import('./pages/invitaciones/invitaciones.module').then( m => m.InvitacionesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
