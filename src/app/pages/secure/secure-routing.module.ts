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
    ]
  },
  {
    path: '',
    component: SecurePage,
    children: [
    {
      path: 'create',
      loadChildren: () => import('./create-user/create-user.module').then(m => m.CreateUserPageModule),
      canActivate: [AuthGuard],
      // data: {
      //   loader: true
      // }
    },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurePageRoutingModule {}
