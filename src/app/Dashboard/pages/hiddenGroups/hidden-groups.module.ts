import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HiddenGroupsRoutes } from './hidden-groups.routes';

import { SharedModule } from 'src/app/Shared/shared.module';

import { HiddenGroupsListComponent } from './pages/hidden-groups-list/hidden-groups-list.component';

@NgModule({
  declarations: [
    HiddenGroupsListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HiddenGroupsRoutes),
    SharedModule,
  ]
})
export class HiddenGroupsModule { }
