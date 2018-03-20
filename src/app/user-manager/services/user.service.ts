import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { resolve } from 'q';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserService {

  private _users: BehaviorSubject<User[]>;
  private internalUserSubscription: User[];
  private dataStore: {
    users: User[]
  };
  private nextId: number;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
    this._users.subscribe(
      newUsers => this.internalUserSubscription = newUsers
    );
    this.getUsers('/users').subscribe(
      users => this._users.next(users)
    );
  }

  getUsers(path): Observable<any[]> {
    return this.db.list(path).valueChanges();
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  // TODO: This still needs to be changed to use Behavior Subject
  // addUser(user: User): Promise<User> {
  //   return new Promise((resolver, reject) => {
  //     user.id = this.dataStore.users.length + 1;
  //     this.dataStore.users.push(user);
  //     this._users.next(Object.assign({}, this.dataStore).users);
  //     resolver(user);
  //   });
  // }

  addUser(user: User): void {
    user.id = this.getNextId();
    this.db.list('/users').push(user);
  }

  userById(id: number): User {
    const filterUsers: User[] = this.internalUserSubscription.filter(user => user.id === +id);
    return filterUsers[0];
  }

  getNextId(): number {
    return Math.max(...this.internalUserSubscription.map(user => user.id)) + 1;
  }

  addClap(id: number) {
    const userToAddClap = this.userById(id);
    userToAddClap.numClaps++;
  }

}

const sortByNumClaps = (user1: User, user2: User): number => user2.numClaps - user1.numClaps;
