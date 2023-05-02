class Scooter {
  static nextSerial = 1;

  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  rent(user) {
    if (this.charge < 20) {
      throw new Error('Scooter needs to charge');
    } else if (this.isBroken) {
      throw new Error('Scooter needs repair');
    } else {
      this.user = user;
      this.station = null;
      console.log(`Scooter ${this.serial} has been rented by ${user.name}`);
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
    console.log(`Scooter ${this.serial} has been docked at ${station}`);
  }
}



module.exports = Scooter
