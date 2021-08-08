import { Routes } from '@angular/router';

import { MainComponent } from './pages/main/main.component';

export const DashboardRoutes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        data: { title: 'Menu' },
    },
    {
        path: 'groups',
        loadChildren: () => import('./pages/groups/groups.module').then(m => m.GroupsModule),
        data: { title: 'Groups' },
    },
    {
        path: 'important',
        loadChildren: () => import('./pages/importantGroups/important-groups.module').then(m => m.ImportantGroupsModule),
        data: { title: 'Important' },
    },
    {
        path: 'hidden',
        loadChildren: () => import('./pages/hiddenGroups/hidden-groups.module').then(m => m.HiddenGroupsModule),
        data: { title: 'Archived' },
    },
    {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule),
        data: { title: 'Settings' },
    },
    { path: '**', pathMatch: 'full', redirectTo: 'main' },
];
