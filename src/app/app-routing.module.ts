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
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
