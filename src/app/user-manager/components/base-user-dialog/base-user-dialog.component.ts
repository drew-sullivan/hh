import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { SKIN_PIGMENTS, HAIR_COLORS, SHIRT_COLORS } from '../../../../assets/avatar-codes';
import { User } from '../../models/user';

@Component({
  selector: 'app-base-user-dialog',
  templateUrl: './base-user-dialog.component.html',
  styleUrls: ['./base-user-dialog.component.scss']
})
export abstract class BaseUserDialogComponent {

  abstract title: String;

  SKIN_PIGMENTS: string[] = SKIN_PIGMENTS;
  HAIR_COLORS: string[] = HAIR_COLORS;
  SHIRT_COLORS: string[] = SHIRT_COLORS;
  user: User;

  constructor(user: User) {
      this.user = user;
      if (user.skills.length < 1) {
        this.user.skills[0] = '';
      }
  }

  name = new FormControl('', [Validators.required]);

  abstract addNewUser();
  abstract dismiss();

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  // TODO: Something is wrong with adding and removing skills
  addNewSkill() {
    this.user.skills[this.user.skills.length] = '';
    console.log(this.user.skills);
  }

  removeSkill(index: number) {
    if (this.user.skills.length > 1) {
      for (let i = index; i < this.user.skills.length; i++) {
        this.user.skills[i] = this.user.skills[i + 1];
      }
    this.user.skills.length--;
    }
    console.log(this.user.skills);
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }
}
