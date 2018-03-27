import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { 'avatar' : {
          'hairColor' : 'hair_bangs_2_black',
          'shirtColor' : 'slim_shirt_pink',
          'skinPigment' : 'skin_f5a76e'
        },
        'gifts' : [ 'gem', 'coin', 'sword', 'sword', 'sword', 'wizard-hat' ],
        'id' : 1,
        'name' : 'Drew Sullivan',
        'skills' : [ 'JavaScript', 'React', 'Angular' ]
      },
      { 'avatar' : {
          'hairColor' : 'hair_bangs_2_brown',
          'shirtColor' : 'slim_shirt_green',
          'skinPigment' : 'skin_ddc994'
        },
        'gifts' : [ 'coin', 'heart', 'sparkles', 'coin', 'coin' ],
        'id' : 2,
        'name' : 'Levi Neal',
        'skills' : [ 'Java', 'C++', 'SQL' ]
      },
      { 'avatar' : {
          'hairColor' : 'hair_bangs_2_black',
          'shirtColor' : 'slim_shirt_blue',
          'skinPigment' : 'skin_98461a'
        },
        'gifts' : [ 'sparkles', 'star', 'sword', 'star' ],
        'id' : 3,
        'name' : 'Sandy Armstrong',
        'skills' : [ 'iOS', 'Android', 'Javascript' ]
      },
      { 'avatar' : {
          'hairColor' : 'hair_bangs_2_red',
          'shirtColor' : 'slim_shirt_black',
          'skinPigment' : 'skin_f5a76e'
        },
        'gifts' : [ 'wizard-hat', 'star', 'coin' ],
        'id' : 4,
        'name' : 'Marcia Higgins',
        'skills' : [ 'Python', 'Flask', 'Django' ]
      }
    ];
    return {users};
  }
}
