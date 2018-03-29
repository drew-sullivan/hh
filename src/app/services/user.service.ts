import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { resolve } from 'q';

import { CurrencyService } from './currency.service';
import { User } from '../user-manager/models/user';

@Injectable()
export class UserService {

  private usersUrl = '/api/users';  // URL to web api
  private _users: BehaviorSubject<User[]>;
  internalUserSubscription: User[];
  private nextId: number;
  private __users__: User[];

  constructor(
    private currencyService: CurrencyService,
    private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    //
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

}

const sortByNumGifts = (user1: User, user2: User): number => user2.gifts.length - user1.gifts.length;

const getRandomArrayItems = (arr, numDesired) => {
  const randomItems = [];
  for (let i = 0; i < numDesired; i++) {
    randomItems.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return randomItems;
};
