import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/auth-service/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule),
    data: {
      loader: true
    }
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/secure/users/users.module').then(m => m.UsersPageModule),
    canActivate: [AuthGuard],
    data: {
      loader: true
    }
  },
  {
    path: 'user-edit/:id',
    loadChildren: () => import('./pages/secure/user-edit/user-edit.module').then(m => m.UserEditPagePageModule),
    canActivate: [AuthGuard],
    data: {
      loader: true
    }
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/secure/create-user/create-user.module').then(m => m.CreateUserPageModule),
    canActivate: [AuthGuard],
    data: {
      loader: true
    }
  },
  {
    path: 'secure',
    loadChildren: () => import('./pages/secure/secure.module').then( m => m.SecurePageModule),
    canActivate: [AuthGuard]
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
