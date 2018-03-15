import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;

}
