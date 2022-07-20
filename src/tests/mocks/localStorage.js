// 1:
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock;

// 2:

var localStorageMock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// 3:
// does not work:
jest.spyOn(localStorage, "setItem");
localStorage.setItem = jest.fn();

// either of these lines will work:
jest.spyOn(Storage.prototype, 'setItem');
Storage.prototype.setItem = jest.fn();

// assertions as usual:
expect(localStorage.setItem).toHaveBeenCalled();

// resposta ao comentário
// Actually it works for me just with the spyOn, no need to override setItem function jest.spyOn(window.localStorage.__proto__, 'setItem');


