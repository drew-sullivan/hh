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

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
    this._users.subscribe( (newUsers) => {
      this.internalUserSubscription = newUsers;
    });
    this.getUsers('/users').subscribe( (users) => {
      console.log('USER SERVICE ---- USERS');
      console.log(users);
      this._users.next(users);
    });
  }

  getUsers(path): Observable<any[]> {
    console.log(this.db.list(path).valueChanges());
    return this.db.list(path).valueChanges();
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  addUser(user: User): Promise<User> {
    return new Promise((resolver, reject) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);
      this._users.next(Object.assign({}, this.dataStore).users);
      resolver(user);
    });
  }

  userById(id: number): User {
    /*
    return this.dataStore.users.find(x => x.id === +id);
    */

      const filterUsers: User[] = this.internalUserSubscription.filter( (user) => {
          return user.id == id;
      });
      console.log(id);
      console.log(filterUsers);
      return filterUsers[0];
  }

  addClap(id: number) {
    const clappedPerson = this.dataStore.users.find(user => user.id === id);
    clappedPerson.numClaps++;
  }

  // loadAll() {
  //   const usersUrl = 'https://drew-sullivan.github.io/hyland-helpers-data.txt';

  //   return this.http.get<User[]>(usersUrl)
  //     .subscribe(data => {
  //       this.dataStore.users = data.sort(sortByNumClaps);
  //       this._users.next(Object.assign({}, this.dataStore).users);
  //     }, error => {
  //       console.log('Failed to fetch users');
  //     });
  // }

}

const sortByNumClaps = (user1: User, user2: User): number => user2.numClaps - user1.numClaps;
