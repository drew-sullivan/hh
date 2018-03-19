import { ICONS } from './../../../../assets/svg/manifest-of-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss', '../../../../assets/avatar-piece-locations.scss']
})
export class MainContentComponent implements OnInit {

  user: User;
  icons = ICONS;

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
      for (const icon of this.icons) {
        iconRegistry.addSvgIcon(`${icon}`, sanitizer.bypassSecurityTrustResourceUrl(`../../../../assets/svg/${icon}.svg`));
      }
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) { id = 1; }

      // this.user = null;
      this.user = this.service.userById(id); // TODO: This doesn't seem to work as intended. First user never loads.
      console.log(this.user);

      // this.service.users.subscribe(users => {
      //   if (users.length === 0) { return; }

      //   setTimeout(() => {
      //   }, 1);
      // });
    });
  }

  incrementClap(id: number) {
    this.service.addClap(id);
  }

  addGift(event: any) {
    const gift = event.value;
    this.user.gifts.push(gift);
  }

}
