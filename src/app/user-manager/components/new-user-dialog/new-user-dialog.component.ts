import { GIFTS } from './../../../../app/services/gift-manifest';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { BaseUserDialogComponent } from '../base-user-dialog/base-user-dialog.component';
import { UserService, CurrencyService } from '../../../services/index';
import { User } from '../../models/user';
import { SKIN_PIGMENTS, HAIR_COLORS, SHIRT_COLORS } from '../../../../assets/avatar-codes';

const NUM_STARTING_GIFTS = 3;

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: '../base-user-dialog/base-user-dialog.component.html',
  styleUrls: ['../base-user-dialog/base-user-dialog.component.scss', '../../../../assets/avatar-piece-locations.scss']
})

export class NewUserDialogComponent extends BaseUserDialogComponent implements OnInit {

  SKIN_PIGMENTS: string[] = SKIN_PIGMENTS;
  HAIR_COLORS: string[] = HAIR_COLORS;
  SHIRT_COLORS: string[] = SHIRT_COLORS;
  user: User;
  skills = [''];
  giftImageNames = GIFTS;
  title = 'Add New User';

  hairColor = 'hair_bangs_2_brown';
  skinPigment = 'skin_ea8349';
  shirtColor = 'slim_shirt_green';

  constructor(
    private dialogRef: MatDialogRef<NewUserDialogComponent>,
    private userService: UserService,
    private currencyService: CurrencyService) { super(new User()); }

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  ngOnInit() {
    // adding avatar for previewing avatar choices
    this.user.avatar = {
      hairColor: this.hairColor,
      skinPigment: this.skinPigment,
      shirtColor: this.shirtColor
    };
  }

  addNewUser() {
    alert('This needs to be implemented! :)');
    // this.userService.addUser(this.user);
    this.dismiss();
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
