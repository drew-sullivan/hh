import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { BaseUserDialogComponent } from '../base-user-dialog/base-user-dialog.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: '../base-user-dialog/base-user-dialog.component.html',
  styleUrls: ['../base-user-dialog/base-user-dialog.component.scss', '../../../../assets/avatar-piece-locations.scss']
})
export class EditUserDialogComponent extends BaseUserDialogComponent implements OnInit {

  title = 'Edit User';

  constructor(private dialogRef: MatDialogRef<EditUserDialogComponent>,
    private userService: UserService) {
      super(new User());
  //    super(userService.internalUserSubscription[2]);
  //    const user = userService.internalUserSubscription[2];
  //    console.log(user.skills);
    }

  ngOnInit() {
  }

  addNewUser() {

  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
