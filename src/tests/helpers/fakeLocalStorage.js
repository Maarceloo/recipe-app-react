export class fakeStorage {
  constructor(props) {
    this.store = props || {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return (this.store[key] && typeof this.store[key] === 'string') ? (this.store[key]) : this.store[key] ? JSON.stringify(this.store[key]) : null;
  }

  setItem(key, value) {
    this.store[key] = typeof value === 'string' ? value : this.store[key];
  }

  removeItem(key) {
    delete this.store[key];
  }
}

// A cada teste que o LocalStorage for necessário, adicione o comando (ou em um beforeEach). Remova da função ou a invoque.

export const mockLocalStorage = (initialStore = {}) => {
  Object.defineProperty(window, 'localStorage', {
    value: new fakeStorage(initialStore),
  });
};

export const mockSessionStorage = (initialStore = {}) => {
  Object.defineProperty(window, 'sessionStorage', {
    value: new fakeStorage(initialStore),
  });
};

// Pode-se passar um objeto como parâmetro quando invocado o novo objeto da classe fakeLocalStorage.

// ATENÇÃO! - o fake se comporta como o original:
// 1. O valor inicial deve ser um objeto, assim como o localStorage. Dentro de cada chave pode-se declarar outros tipos de dados. - Não passe esse objeto stringficado.
// 2. Se não for uma string passada como valor para "localStorage.setItem(valor)", a chave não será setada.
// 3. O valor de retorno de getitem será sempre uam string
// 4. Igual tudo fora do git, deletou, acabou, cuidado com o delete! =P
