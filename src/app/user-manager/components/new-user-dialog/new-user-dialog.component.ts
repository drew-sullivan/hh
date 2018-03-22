import { GIFT_IMAGE_NAMES } from './../../../../assets/svg/manifest-of-icons';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { BaseUserDialogComponent } from '../base-user-dialog/base-user-dialog.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { SKIN_PIGMENTS, HAIR_COLORS, SHIRT_COLORS } from '../../../../assets/avatar-codes';

const NUM_STARTING_GIFTS = 3;

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: '../base-user-dialog/base-user-dialog.component.html',
  styleUrls: ['../base-user-dialog/base-user-dialog.component.scss', '../../../../assets/avatar-piece-locations.scss']
})
export class NewUserDialogComponent extends BaseUserDialogComponent implements OnInit {
  title = 'Add New User';
  giftImageNames = GIFT_IMAGE_NAMES;

  hairColor = 'hair_bangs_2_brown';
  skinPigment = 'skin_ea8349';
  shirtColor = 'slim_shirt_green';

  constructor(
    private dialogRef: MatDialogRef<NewUserDialogComponent>,
    private userService: UserService) { super(new User()); }

  ngOnInit() {

    // adding avatar for previewing avatar choices
    this.user.avatar = {
      hairColor: this.hairColor,
      skinPigment: this.skinPigment,
      shirtColor: this.shirtColor
    };
  }

  addNewUser() {
    this.user.numClaps = 0;
    this.user.gifts = getRandomArrayItems(GIFT_IMAGE_NAMES, NUM_STARTING_GIFTS);
    this.userService.addUser(this.user);
    this.dismiss();
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}

const getRandomArrayItems = (arr, numDesired) => {
  const randomItems = [];
  for (let i = 0; i < numDesired; i++) {
    randomItems.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return randomItems;
};
