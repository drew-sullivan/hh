import { GIFTS } from './../../../../app/services/gift-manifest';
import { CurrencyService } from './../../../services/currency-service.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { SKIN_PIGMENTS, HAIR_COLORS, SHIRT_COLORS } from '../../../../assets/avatar-codes';

const NUM_STARTING_GIFTS = 3;

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss', '../../../../assets/avatar-piece-locations.scss']
})
export class NewUserDialogComponent implements OnInit {

  SKIN_PIGMENTS: string[] = SKIN_PIGMENTS;
  HAIR_COLORS: string[] = HAIR_COLORS;
  SHIRT_COLORS: string[] = SHIRT_COLORS;
  user: User;
  skills = [''];
  giftImageNames = GIFTS;

  hairColor = 'hair_bangs_2_brown';
  skinPigment = 'skin_ea8349';
  shirtColor = 'slim_shirt_green';

  constructor(
    private dialogRef: MatDialogRef<NewUserDialogComponent>,
    private userService: UserService,
    private currencyService: CurrencyService) { }

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  ngOnInit() {
    this.user = new User();

    // adding avatar for previewing avatar choices
    this.user.avatar = {
      hairColor: this.hairColor,
      skinPigment: this.skinPigment,
      shirtColor: this.shirtColor
    };
  }

  addNewSkill() {
    this.skills[this.skills.length] = '';
  }

  removeSkill(index: number) {
    if (this.skills.length > 1) {
      for (let i = index; i < this.skills.length; i++) {
        this.skills[i] = this.skills[i + 1];
      }
    this.skills.length = this.skills.length - 1;
    }
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  addNewUser() {
    this.userService.addUser(this.user);
    this.dismiss();
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
