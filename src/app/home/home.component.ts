import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models/user.model';
import { UserService, AuthenticationService } from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  currentEditUser: User;
  isModalHidden: boolean = true;
  users = [];

  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  hideModal(hide: boolean) {
    this.isModalHidden = hide;
  }

  userSelect(user: User) {
    this.currentEditUser = user;
    this.isModalHidden = false;
  }

  deleteUser(id: number) {
    this.userService.delete(id)
        .pipe(first())
        .subscribe(() => this.loadAllUsers());
  }

  editUser(user: User) {
    this.userService.edit(user)
        .pipe(first())
        .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
  }

}
