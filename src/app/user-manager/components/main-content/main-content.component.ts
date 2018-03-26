import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { CurrencyService } from './../../../services/currency-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatIconRegistry } from '@angular/material/icon';
import { GIFTS } from '../../../services/gift-manifest';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss', '../../../../assets/avatar-piece-locations.scss']
})
export class MainContentComponent implements OnInit {

  user: User;
  FBUsers: Observable<any[]>;
  giftImages = GIFTS;

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    db: AngularFireDatabase) {
      for (const gift of GIFTS) {
        iconRegistry.addSvgIcon(`${gift}`, sanitizer.bypassSecurityTrustResourceUrl(`../../../../assets/svg/${gift}.svg`));
      }
      this.FBUsers = db.list('users').valueChanges();
      console.log(this.FBUsers);
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) { id = 1; }
      this.user = null;

      this.service.users.subscribe(users => {
        if (users.length === 0) { return; }

        setTimeout(() => {
          this.user = this.service.userById(id);
        }, 500);
      });

    });
  }

  addGift(event: any) {
    const gift = event.value;
    this.user.gifts.push(gift);
    // this.service.addGift(this.user.id, gift);
  }

}
