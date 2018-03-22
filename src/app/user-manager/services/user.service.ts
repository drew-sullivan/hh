import { CurrencyService } from './../../services/currency-service.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { resolve } from 'q';
import { AngularFireDatabase } from 'angularfire2/database';

const DB_PATH = '/users';

@Injectable()
export class UserService {

  private _users: BehaviorSubject<User[]>;
  private internalUserSubscription: User[];
  private nextId: number;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private currencyService: CurrencyService) {

    this._users = new BehaviorSubject<User[]>([]);
    this._users.subscribe(
      newUsers => this.internalUserSubscription = newUsers.sort(sortByNumGifts)
    );
    this.getUsersFromDBbyPath(DB_PATH).subscribe(
      users => this._users.next(users)
    );
  }

  getUsersFromDBbyPath(path): Observable<any[]> {
    return this.db.list(path).valueChanges();
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  addUser(user: User): void {
    user.gifts = this.currencyService.generateNewUserItems();
    console.log(user.gifts);
    user.id = this.getNextId();
    this.db.list(DB_PATH).push(user);
  }

  userById(id: number): User {
    const filterUsers: User[] = this.internalUserSubscription.filter(user => user.id === +id);
    return filterUsers[0];
  }

  addGift(id: number, gift: string) {
    // WIP:
  }

  getNextId(): number {
    return Math.max(...this.internalUserSubscription.map(user => user.id)) + 1;
  }

}

const sortByNumGifts = (user1: User, user2: User): number => user2.gifts.length - user1.gifts.length;

const getRandomArrayItems = (arr, numDesired) => {
  const randomItems = [];
  for (let i = 0; i < numDesired; i++) {
    randomItems.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return randomItems;
};
