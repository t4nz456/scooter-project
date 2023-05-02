const User = require('../src/User')

// User tests here

describe('User class', () => {
    let user;
  
    beforeEach(() => {
      user = new User('JohnDoe', 'password', 25);
    });
  
    test('creates a new user object', () => {
      expect(typeof user).toEqual('object');
    });

// test username

describe('stores a username, password, and age', () => {
    expect(user.username).toEqual('JohnDoe');
    expect(user.password).toEqual('password');
    expect(user.age).toEqual(25);
  });


// test login

describe('loggedIn is initially false', () => {
    expect(user.loggedIn).toEqual(false);
  });

  describe('login method', () => {
    describe('logs in the user with correct password', () => {
      user.login('password');
      expect(user.loggedIn).toEqual(true);
    });

    describe('throws error with incorrect password', () => {
      expect(() => user.login('wrongpassword')).toThrow('incorrect password');
      expect(user.loggedIn).toEqual(false);
    });
  });

// test logout

describe('logout method', () => {
    describe('logs out the user', () => {
      user.login('password');
      user.logout();
      expect(user.loggedIn).toEqual(false);
    });
  });
});
