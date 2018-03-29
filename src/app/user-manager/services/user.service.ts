import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { CurrencyService } from './../../services/currency-service.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { resolve } from 'q';
import { AngularFireDatabase } from 'angularfire2/database';

const DB_PATH = '/users';

@Injectable()
export class UserService {

  private nextId: number;
  items: User[];

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private currencyService: CurrencyService) {
  }

  getUsers() {
    return this.http.get('http://localhost:8000/api/users')
    .map(res => (res as any).users);
  }

  getUserById(id: number) {
    return this.http.get('http://localhost:8000/api/users/${id}')
    .map(res => (res as any).filteredUsers[0]);
  }

  addUser(user: User): void {
    user.gifts = this.currencyService.generateNewUserItems();
    console.log(user.gifts);
    user.id = this.getNextId();
    this.db.list(DB_PATH).push(user);
  }

  addGift(id: number, gift: string) {
    // WIP:
  }

  getNextId(): number {
    // return Math.max(...this.internalUserSubscription.map(user => user.id)) + 1;
     return 100;
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
