import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NewUserDialogComponent } from './components/new-user-dialog/new-user-dialog.component';
import { UserManagerAppComponent } from './user-manager-app.component';
import { SkillsComponent } from './components/skills/skills.component';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';

const routes: Routes = [
  {
    path: '', component: UserManagerAppComponent,
    children: [
      { path: ':id', component: MainContentComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserService
  ],
  declarations: [
    UserManagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    NewUserDialogComponent,
    SkillsComponent,
    EditUserDialogComponent
  ],
  entryComponents: [
    NewUserDialogComponent,
    EditUserDialogComponent
  ]
})
export class UserManagerModule { }
