import { Routes } from '@angular/router';
import { AuthGuard } from './Core/guards/auth.guard';
import { NoAuthGuard } from './Core/guards/no-auth.guard';

export const AppRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./Login/login.module').then(m => m.LoginModule),
        canActivate: [NoAuthGuard],
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./Dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
    },
    { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
];
