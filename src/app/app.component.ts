import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
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
  items: Observable<any[]>;

  // constructor(db: AngularFirestore) {
  //   this.items = db.collection('items').valueChanges();
  //   console.log(this.items);
  // }

}
