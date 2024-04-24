export const charactersMock = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.info/api/planets/1',
    films: [
      'https://swapi.info/api/films/1',
      'https://swapi.info/api/films/2',
      'https://swapi.info/api/films/3',
      'https://swapi.info/api/films/6'
    ],
    species: [],
    vehicles: [
      'https://swapi.info/api/vehicles/14',
      'https://swapi.info/api/vehicles/30'
    ],
    starships: [
      'https://swapi.info/api/starships/12',
      'https://swapi.info/api/starships/22'
    ],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.info/api/people/1'
  },
  {
    name: 'C-3PO',
    height: '167',
    mass: '75',
    hair_color: 'n/a',
    skin_color: 'gold',
    eye_color: 'yellow',
    birth_year: '112BBY',
    gender: 'n/a',
    homeworld: 'https://swapi.info/api/planets/1',
    films: [
      'https://swapi.info/api/films/1',
      'https://swapi.info/api/films/2',
      'https://swapi.info/api/films/3',
      'https://swapi.info/api/films/4',
      'https://swapi.info/api/films/5',
      'https://swapi.info/api/films/6'
    ],
    species: ['https://swapi.info/api/species/2'],
    vehicles: [],
    starships: [],
    created: '2014-12-10T15:10:51.357000Z',
    edited: '2014-12-20T21:17:50.309000Z',
    url: 'https://swapi.info/api/people/2'
  }
];
export const planetsMock = [
  {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    surface_water: '1',
    population: '200000',
    residents: [
      'https://swapi.info/api/people/1',
      'https://swapi.info/api/people/2',
      'https://swapi.info/api/people/4',
      'https://swapi.info/api/people/6',
      'https://swapi.info/api/people/7',
      'https://swapi.info/api/people/8',
      'https://swapi.info/api/people/9',
      'https://swapi.info/api/people/11',
      'https://swapi.info/api/people/43',
      'https://swapi.info/api/people/62'
    ],
    films: [
      'https://swapi.info/api/films/1',
      'https://swapi.info/api/films/3',
      'https://swapi.info/api/films/4',
      'https://swapi.info/api/films/5',
      'https://swapi.info/api/films/6'
    ],
    created: '2014-12-09T13:50:49.641000Z',
    edited: '2014-12-20T20:58:18.411000Z',
    url: 'https://swapi.info/api/planets/1'
  },
  {
    name: 'Alderaan',
    rotation_period: '24',
    orbital_period: '364',
    diameter: '12500',
    climate: 'temperate',
    gravity: '1 standard',
    terrain: 'grasslands, mountains',
    surface_water: '40',
    population: '2000000000',
    residents: [
      'https://swapi.info/api/people/5',
      'https://swapi.info/api/people/68',
      'https://swapi.info/api/people/81'
    ],
    films: ['https://swapi.info/api/films/1', 'https://swapi.info/api/films/6'],
    created: '2014-12-10T11:35:48.479000Z',
    edited: '2014-12-20T20:58:18.420000Z',
    url: 'https://swapi.info/api/planets/2'
  }
];
export const planetsMockHashMap = {
  '1': planetsMock[0],
  '2': planetsMock[1]
};

export const speciesMock = [
  {
    name: 'Human',
    classification: 'mammal',
    designation: 'sentient',
    average_height: '180',
    skin_colors: 'caucasian, black, asian, hispanic',
    hair_colors: 'blonde, brown, black, red',
    eye_colors: 'brown, blue, green, hazel, grey, amber',
    average_lifespan: '120',
    homeworld: 'https://swapi.info/api/planets/9',
    language: 'Galactic Basic',
    people: [
      'https://swapi.info/api/people/66',
      'https://swapi.info/api/people/67',
      'https://swapi.info/api/people/68',
      'https://swapi.info/api/people/74'
    ],
    films: [
      'https://swapi.info/api/films/1',
      'https://swapi.info/api/films/2',
      'https://swapi.info/api/films/3',
      'https://swapi.info/api/films/4',
      'https://swapi.info/api/films/5',
      'https://swapi.info/api/films/6'
    ],
    created: '2014-12-10T13:52:11.567000Z',
    edited: '2014-12-20T21:36:42.136000Z',
    url: 'https://swapi.info/api/species/1'
  },
  {
    name: 'Droid',
    classification: 'artificial',
    designation: 'sentient',
    average_height: 'n/a',
    skin_colors: 'n/a',
    hair_colors: 'n/a',
    eye_colors: 'n/a',
    average_lifespan: 'indefinite',
    homeworld: null,
    language: 'n/a',
    people: [
      'https://swapi.info/api/people/2',
      'https://swapi.info/api/people/3',
      'https://swapi.info/api/people/8',
      'https://swapi.info/api/people/23'
    ],
    films: [
      'https://swapi.info/api/films/1',
      'https://swapi.info/api/films/2',
      'https://swapi.info/api/films/3',
      'https://swapi.info/api/films/4',
      'https://swapi.info/api/films/5',
      'https://swapi.info/api/films/6'
    ],
    created: '2014-12-10T15:16:16.259000Z',
    edited: '2014-12-20T21:36:42.139000Z',
    url: 'https://swapi.info/api/species/2'
  }
];
export const speciesMockHashMap = {
  '1': speciesMock[0],
  '2': speciesMock[1]
};
