import { GIFT_IMAGE_NAMES } from './../../../../assets/svg/manifest-of-icons';
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
  giftImageNames = GIFT_IMAGE_NAMES;

  hairColor = 'hair_bangs_2_brown';
  skinPigment = 'skin_ea8349';
  shirtColor = 'slim_shirt_green';

  constructor(
    private dialogRef: MatDialogRef<NewUserDialogComponent>,
    private userService: UserService) { }

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  ngOnInit() {
    this.user = new User();

    // adding avatar2 for previewing avatar choices
    this.user.avatar2 = {
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
