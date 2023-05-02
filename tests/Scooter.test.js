const Scooter = require('../src/Scooter')
const User = require('../src/User')



//Method tests
describe('scooter methods', () => {
  // tests here!

    describe('should be an object', () => {
      expect(typeof scooter).toBe('object');
    });
  
    describe('should have a string property "id"', () => {
      expect(typeof scooter.id).toBe('string');
    });
  
    describe('should have a string property "color"', () => {
      expect(typeof scooter.color).toBe('string');
    });
  
    describe('should have a number property "charge"', () => {
      expect(typeof scooter.charge).toBe('number');
    });
  
    describe('should have a string property "station"', () => {
      expect(typeof scooter.station).toBe('string');
    });
  
    describe('should have a boolean property "isRented" initialized to false', () => {
      expect(scooter.isRented).toBe(false);
    });
  
    describe('should have a boolean property "isDamaged" initialized to false', () => {
      expect(scooter.isDamaged).toBe(false);
    });
  });

  //rent method

  describe('rent', () => {
    describe('removes scooter from station and assigns to user if charged above 20% and not broken', () => {
      scooter.charge = 50;
      scooter.isBroken = false;
      scooter.rent({ name: 'John Doe' });
      expect(scooter.station).toBeNull();
      expect(scooter.user).toEqual({ name: 'John Doe' });
    });

    describe('throws an error if scooter is not charged above 20%', () => {
      scooter.charge = 10;
      expect(() => scooter.rent({ name: 'John Doe' })).toThrowError('Scooter needs to charge');
    });

    describe('throws an error if scooter is broken', () => {
      scooter.isBroken = true;
      expect(() => scooter.rent({ name: 'John Doe' })).toThrowError('Scooter needs repair');
    });
  });

  //dock method

  describe('dock', () => {
    describe('docks scooter at specified station and clears user property', () => {
      scooter.user = { name: 'John Doe' };
      scooter.dock('Station B');
      expect(scooter.station).toEqual('Station B');
      expect(scooter.user).toBeNull();
    });
  }); 


  //requestRepair method

  describe('requestRepair', () => {
    describe('sets isBroken property to true', () => {
      scooter.requestRepair();
      expect(scooter.isBroken).toBe(true);
    });
  });

  //charge method

  describe('charge', () => {
    describe('increments charge by specified amount', () => {
      scooter.charge(50);
      expect(scooter.charge).toBe(150);
    });

    describe('does not allow charge to exceed 100', () => {
      scooter.charge(50);
      expect(scooter.charge).toBe(150);
      scooter.charge(60);
      expect(scooter.charge).toBe(100);
    });
  });
