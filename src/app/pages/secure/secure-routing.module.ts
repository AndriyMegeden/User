import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurePage } from './secure.page';
import { AuthGuard } from '@core/auth-service/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SecurePage,
    children: [
    {
      path: 'users',
      loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule),
      canActivate: [AuthGuard],
      // data: {
      //   loader: true
      // }
    },
    {
      path: 'roles',
      loadChildren: () => import('./roles/roles.module').then( m => m.RolesPageModule)
    },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurePageRoutingModule {}
