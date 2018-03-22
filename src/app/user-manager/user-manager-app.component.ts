import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-manager-app',
  template: `
    <app-sidenav></app-sidenav>
  `,
  styles: []
})
export class UserManagerAppComponent { }
