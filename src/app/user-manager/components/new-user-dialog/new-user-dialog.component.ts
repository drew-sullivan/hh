import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss']
})
export class NewUserDialogComponent implements OnInit {


  SKIN_PIGMENTS = [
    'skin_ddc994',
    'skin_f5a76e',
    'skin_ea8349',
    'skin_c06534',
    'skin_98461a',
    'skin_915533',
  ];

  HAIR_CODES = [
    'hair_bangs_2_brown',
    'hair_bangs_2_black',
    'hair_bangs_2_blond',
    'hair_bangs_2_red',
    'hair_bangs_2_white',
  ];

  SHIRT_COLORS = [
    'slim_shirt_black',
    'slim_shirt_blue',
    'slim_shirt_green',
    'slim_shirt_pink',
    'slim_shirt_yellow',
  ];

  avatars = [
    'svg-1', 'svg-2', 'svg-3', 'svg-4'
  ];
  user: User;
  skills = [''];

  hair = 'hair_bangs_2_brown';
  pigment = 'skin_ea8349';
  shirt = 'slim_shirt_green';

  constructor(
    private dialogRef: MatDialogRef<NewUserDialogComponent>,
    private userService: UserService) { }

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  ngOnInit() {
    this.user = new User();
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
    this.userService.addUser(this.user).then(user => {
      this.dialogRef.close(user);
    });
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
