const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

// ScooterApp tests here

describe('ScooterApp', () => {
    let scooterApp;
  
    beforeEach(() => {
      scooterApp = new ScooterApp();
    });
  
    describe('constructor', () => {
      test('stations object is initialized with at least three stations', () => {
        expect(scooterApp.stations).toBeDefined();
        expect(Object.keys(scooterApp.stations)).toHaveLength(3);
      });
  
      describe('registeredUsers object is initialized as an empty object', () => {
        expect(scooterApp.registeredUsers).toBeDefined();
        expect(scooterApp.registeredUsers).toEqual({});
      });
    });

// register user

describe('registerUser', () => {
    describe('adds a new user with the given username, password, and age', () => {
      const user = scooterApp.registerUser('john', 'password', 20);
      expect(user).toBeDefined();
      expect(user.username).toEqual('john');
      expect(user.password).toEqual('password');
      expect(user.age).toEqual(20);
    });

    describe('throws an error if the user is already registered', () => {
      scooterApp.registerUser('john', 'password', 20);
      expect(() => scooterApp.registerUser('john', 'password', 21)).toThrow('User already registered');
    });

    describe('throws an error if the user is too young to register', () => {
      expect(() => scooterApp.registerUser('john', 'password', 17)).toThrow('User must be at least 18 years old to register');
    });
  });

// log in

describe('loginUser', () => {
    describe('logs in a registered user with the correct password', () => {
      const user = scooterApp.registerUser('john', 'password', 20);
      scooterApp.loginUser('john', 'password');
      expect(user.loggedIn).toBe(true);
    });

    describe('throws an error if the username is incorrect', () => {
      expect(() => scooterApp.loginUser('john', 'password')).toThrow('Username or password is incorrect');
    });

    describe('throws an error if the password is incorrect', () => {
      scooterApp.registerUser('john', 'password', 20);
      expect(() => scooterApp.loginUser('john', 'wrongpassword')).toThrow('Username or password is incorrect');
    });
  });

// log out

describe('logoutUser', () => {
    describe('logs out a registered user', () => {
      const user = scooterApp.registerUser('john', 'password', 20);
      scooterApp.loginUser('john', 'password');
      scooterApp.logoutUser('john');
      expect(user.loggedIn).toBe(false);
    });

    describe('throws an error if the user is not logged in', () => {
      scooterApp.registerUser('john', 'password', 20);
      expect(() => scooterApp.logoutUser('john')).toThrow('No such user is logged in');
    });
  });

// rent scooter

describe('successfully rents a scooter', () => {
    const rentedScooter = scooterApp.rentScooter(scooter, user);
    expect(rentedScooter.isRented).toBe(true);
    expect(scooterApp.stations[station]).toHaveLength(0);
    expect(user.rentalHistory).toContain(rentedScooter);
  });

  describe('throws error if scooter is already rented', () => {
    const secondUser = new User('secondUser', 'testPassword', 21);
    scooterApp.registerUser(secondUser.username, secondUser.password, secondUser.age);
    scooterApp.rentScooter(scooter, user);
    expect(() => scooterApp.rentScooter(scooter, secondUser)).toThrow('Scooter already rented');
    expect(scooter.isRented).toBe(true);
    expect(user.rentalHistory).toContain(scooter);
  });

  describe('throws error if user is already renting a scooter', () => {
    const secondScooter = new Scooter();
    scooterApp.createScooter(station);
    scooterApp.rentScooter(scooter, user);
    expect(() => scooterApp.rentScooter(secondScooter, user)).toThrow('User already renting a scooter');
    expect(secondScooter.isRented).toBe(false);
    expect(user.rentalHistory).toContain(scooter);
  });


// dock scooter

describe('should dock the scooter at the station', () => {
    const scooter = new Scooter('scooter-id', 'brand', 'model', 100);
    const stationName = 'Central Park';
    scooterApp.createScooterStation(stationName);
    scooterApp.dockScooter(scooter, stationName);
    const station = scooterApp.stations[stationName];
    expect(station.scooters).toContain(scooter);
    expect(scooter.station).toEqual(station);
  });

  describe('should throw an error if station does not exist', () => {
    const scooter = new Scooter('scooter-id', 'brand', 'model', 100);
    const stationName = 'Central Park';


    expect(() => scooterApp.dockScooter(scooter, stationName)).toThrow('No such station');
  });

  describe('should throw an error if the scooter is already docked', () => {
    const scooter = new Scooter('scooter-id', 'brand', 'model', 100);
    const stationName = 'Central Park';
    scooterApp.createScooterStation(stationName);
    scooterApp.dockScooter(scooter, stationName);
    expect(() => scooterApp.dockScooter(scooter, stationName)).toThrow('Scooter is already at this station');
  });
});
