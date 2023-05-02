const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  constructor() {
    this.stations = {
      'Station A': [],
      'Station B': [],
      'Station C': []
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error('User is already registered');
    }
    if (age < 18) {
      throw new Error('User is too young to register');
    }

    const newUser = new User(username, password, age);
    this.registeredUsers[username] = newUser;
    console.log(`User ${username} has been registered`);
    return newUser;
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (!user) {
      throw new Error('Username is incorrect');
    }
    try {
      user.login(password);
      console.log(`User ${username} has been logged in`);
    } catch (error) {
      throw new Error('Password is incorrect');
    }
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user || !user.loggedIn) {
      throw new Error('No such user is logged in');
    }
    user.logout();
    console.log(`User ${username} has been logged out`);
  }

  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error('No such station');
    }
    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log('Created new scooter');
    return scooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error('No such station');
    }
    if (scooter.station === station) {
      throw new Error('Scooter is already at station');
    }
    const index = scooter.station ? this.stations[scooter.station].indexOf(scooter) : -1;
    if (index >= 0) {
      this.stations[scooter.station].splice(index, 1);
    }
    scooter.station = station;
    this.stations[station].push(scooter);
    console.log('Scooter is docked');
  }

  rentScooter(scooter, user) {
    if (scooter.user) {
      throw new Error('Scooter is already rented');
    }
    const station = this.stations[scooter.station];
    const index = station.indexOf(scooter);
    if (index < 0) {
      throw new Error('No such scooter at station');
    }
    if (scooter.charge < 20 || scooter.isBroken) {
      throw new Error('Scooter needs to charge or scooter needs repair');
    }
    station.splice(index, 1);
    scooter.user = user;
    console.log('Scooter is rented');
  }

  print() {
    console.log('Registered Users:');
    console.table(this.registeredUsers);
    console.log('Stations:');
    for (const stationName in this.stations) {
      const scooters = this.stations[stationName];
      console.log(`${stationName}: ${scooters.length} scooters`);
    }
  }
}


module.exports = ScooterApp
