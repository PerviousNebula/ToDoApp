import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutes } from './settings.routes';

import { SharedModule } from 'src/app/Shared/shared.module';

import { SettingsComponent } from './pages/settings/settings.component';
import { UserProfileFormComponent } from './components/user-profile-form/user-profile-form.component';

@NgModule({
  declarations: [
    SettingsComponent,
    UserProfileFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(SettingsRoutes),
    SharedModule,
  ]
})
export class SettingsModule { }
