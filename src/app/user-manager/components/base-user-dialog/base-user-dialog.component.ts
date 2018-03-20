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
  skills = [''];

  constructor(user: User) {
      this.user = user;
  }

  name = new FormControl('', [Validators.required]);

  abstract addNewUser();
  abstract dismiss();

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  // TODO: Something is wrong with adding and removing skills
  addNewSkill() {
    this.skills[this.skills.length] = '';
  }

  removeSkill(index: number) {
    if (this.skills.length > 1) {
      for (let i = index; i < this.skills.length; i++) {
        this.skills[i] = this.skills[i + 1];
      }
    this.skills.length--;
    }
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }
}
