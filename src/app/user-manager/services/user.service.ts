import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { resolve } from 'q';

import { CurrencyService } from './../../services/currency-service.service';
import { User } from '../models/user';

@Injectable()
export class UserService {

  private usersUrl = 'api/users';  // URL to web api
  private _users: BehaviorSubject<User[]>;
  internalUserSubscription: User[];
  private nextId: number;
  items: User[];

  constructor(
    private currencyService: CurrencyService,
    private http: HttpClient) { }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.usersUrl)
  //     .pipe(
  //       catchError(this.handleError('getUsers', []))
  //     );
  // }

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser with id = ${id}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  // getUsersFromDBbyPath(path): Observable<any[]> {
  //   return this.db.list(path).valueChanges();
  // }

  // get users(): Observable<User[]> {
  //   console.log(this.items);
  //   return this._users.asObservable();
  // }

  // addUser(user: User): void {
  //   user.gifts = this.currencyService.generateNewUserItems();
  //   console.log(user.gifts);
  //   user.id = this.getNextId();
  //   this.db.list(DB_PATH).push(user);
  // }

  // userById(id: number): User {
  //   const filterUsers: User[] = this.internalUserSubscription.filter(user => user.id === +id);
  //   return filterUsers[0];
  // }

  // addGift(id: number, gift: string) {
  //   // WIP:
  // }

  // getNextId(): number {
  //   return Math.max(...this.internalUserSubscription.map(user => user.id)) + 1;
  // }

}

const sortByNumGifts = (user1: User, user2: User): number => user2.gifts.length - user1.gifts.length;

const getRandomArrayItems = (arr, numDesired) => {
  const randomItems = [];
  for (let i = 0; i < numDesired; i++) {
    randomItems.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return randomItems;
};
