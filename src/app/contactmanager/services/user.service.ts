import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { resolve } from 'q';

@Injectable()
export class UserService {

  private _users: BehaviorSubject<User[]>;
  private dataStore: {
    users: User[]
  }

  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
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

  userById(id: number) {
    // console.log(typeof(+id));
    return this.dataStore.users.find(x => x.id === +id);
  }

  loadAll() {
    const usersUrl = 'https://drew-sullivan.github.io/angular-material-pluralsight-data.html';

    return this.http.get<User[]>(usersUrl)
      .subscribe(data => {
        this.dataStore.users = data;
        console.log(this.dataStore.users);
        this._users.next(Object.assign({}, this.dataStore).users);
      }, error => {
        console.log('Failed to fetch users');
      });
  }

}

const USERS = [
  {
      id: 1,
      firstName: 'Luke',
      lastName: 'Skywalker',
      mostHelpfulWith: ['The Light Side', 'Tatooine Politics', 'Moisture Farming'],
      numClaps: 17
  },
  {
      id: 2,
      firstName: 'Leia',
      lastName: 'Organa',
      mostHelpfulWith: ['Floating through space', 'The Rebellion', 'Summoning Obi-Wan Kenobi for help'],
      numClaps: 22
  },
  {
      id: 3,
      firstName: 'Han',
      lastName: 'Solo',
      mostHelpfulWith: ['Smuggling', 'Shooting first', 'Escaping Pizza the Hut'],
      numClaps: 13
  },
  {
      id: 4,
      firstName: 'Lando',
      lastName: 'Calrissian',
      mostHelpfulWith: ['Losing M. Falcon to Han', 'Betrayals at Bespin', 'Capes'],
      numClaps: 9
  },
  {
      id: 5,
      firstName: 'Darth',
      lastName: 'Vader',
      mostHelpfulWith: ['The Dark Side', 'Shot putting the emperor', 'Getting the Death Star Blown Up'],
      numClaps: 24
  },
  {
      id: 6,
      firstName: 'Yoda',
      lastName: '',
      mostHelpfulWith: ['The Light Side', 'Doing (but not trying)', '(Jedi) code reviews'],
      numClaps: 8
  }
];
