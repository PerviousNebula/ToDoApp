import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ImportantGroupsRoutes } from './important-groups.routes';

import { SharedModule } from 'src/app/Shared/shared.module';

import { ImportantGroupsListComponent } from './pages/important-groups-list/important-groups-list.component';

@NgModule({
  declarations: [
    ImportantGroupsListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ImportantGroupsRoutes),
    SharedModule,
  ]
})
export class ImportantGroupsModule { }
