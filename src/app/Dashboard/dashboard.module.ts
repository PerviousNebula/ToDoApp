import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../Shared/shared.module';

import { DashboardRoutes } from './dashboard.routes';

import { MainComponent } from './pages/main/main.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { ImportantGroupsComponent } from './pages/importantGroups/important-groups.component';

@NgModule({
  declarations: [
    MainComponent,
    GroupsComponent,
    ImportantGroupsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    SharedModule,
  ]
})
export class DashboardModule { }
