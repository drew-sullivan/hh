import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { BaseUserDialogComponent } from '../base-user-dialog/base-user-dialog.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { SKIN_PIGMENTS, HAIR_COLORS, SHIRT_COLORS } from '../../../../assets/avatar-codes';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: '../base-user-dialog/base-user-dialog.component.html',
  styleUrls: ['../base-user-dialog/base-user-dialog.component.scss', '../../../../assets/avatar-piece-locations.scss']
})
export class NewUserDialogComponent extends BaseUserDialogComponent implements OnInit {
  title = 'Add New User';

  hairColor = 'hair_bangs_2_brown';
  skinPigment = 'skin_ea8349';
  shirtColor = 'slim_shirt_green';

  constructor(
    private dialogRef: MatDialogRef<NewUserDialogComponent>,
    private userService: UserService) { super(new User()); }

  ngOnInit() {

    // adding avatar2 for previewing avatar choices
    this.user.avatar2 = {
      hairColor: this.hairColor,
      skinPigment: this.skinPigment,
      shirtColor: this.shirtColor
    };
  }

  addNewUser() {
    this.user.numClaps = 0;
    this.user.gifts = ['coin', 'coin', 'coin'];
    console.log(this.user);
    this.userService.addUser(this.user).then(user => {
      this.dialogRef.close(user);
    });
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
