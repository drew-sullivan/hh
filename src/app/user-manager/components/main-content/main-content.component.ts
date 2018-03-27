
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';

import { User } from '../../models/user';
import { CurrencyService } from './../../../services/currency-service.service';
import { UserService } from '../../services/user.service';

import { GIFTS } from '../../../services/gift-manifest';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss', '../../../../assets/avatar-piece-locations.scss']
})
export class MainContentComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
      for (const gift of GIFTS) {
        iconRegistry.addSvgIcon(`${gift}`, sanitizer.bypassSecurityTrustResourceUrl(`../../../../assets/svg/${gift}.svg`));
      }
    }

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   let id = params['id'];
    //   if (!id) { id = 1; }
    //   this.user = null;

    //   this.userService.users.subscribe(users => {
    //     if (users.length === 0) { return; }

    //     setTimeout(() => {
    //       this.user = this.userService.getUser(id);
    //     }, 500);
    //   });

    // });
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }


  addGift(event: any) {
    const gift = event.value;
    this.user.gifts.push(gift);
    // this.service.addGift(this.user.id, gift);
  }

}
