import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurePage } from './secure.page';

import { AuthGuard } from '@core/auth-service/guards/auth.guard';
import { StatisticComponent } from '@theme/components/statistic/statistic.component';

const routes: Routes = [
  {
    path: '',
    component: SecurePage,
    children: [
      {
        path: '',
        component: StatisticComponent // 👈 відкривається автоматично при переході в /secure
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'create',
        loadChildren: () => import('./create-user/create-user.module').then(m => m.CreateUserPageModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurePageRoutingModule {}
