import { User } from './../../models/user';
import { Component, OnInit, NgZone, ViewChild, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss', '../../../../assets/avatar-piece-locations.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  users: Observable<User[]>;
  usersFB: Observable<User[]>;
  dir = 'ltr';

  constructor(
    zone: NgZone,
    private userService: UserService,
    private router: Router,
    private db: AngularFireDatabase) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = mql));
  }

  ngOnInit() {
  //  this.usersFB = this.getUsers('/users');
    this.users = this.userService.users;
    // this.userService.loadAll();

    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  getUsers(path): Observable<any[]> {
    console.log(this.db.list(path).valueChanges());
    return this.db.list(path).valueChanges();
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  incrementClap(id: number) {
    console.log(id);
    this.userService.addClap(id);
  }

}
