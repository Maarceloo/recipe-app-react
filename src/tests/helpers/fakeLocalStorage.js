export class FakeStorage {
  constructor(props = {}) {
    this.store = typeof props === 'object' ? props : {};
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

  length() {
    return this.store.length;
  } 

  mockController = {
    resetStore: (value) => this.store = value,
  }
}

// A cada teste que o LocalStorage for necessário, adicione o comando (ou em um beforeEach). Remova da função ou a invoque. A função terá sempre escopo global, não será possível desmockar o storage no mesmo arquivo

export const mockLocalStorage = (initialStore = {}) => {
  Object.defineProperty(window, 'localStorage', {
    value: new FakeStorage(initialStore),
  });
};

export const mockSessionStorage = (initialStore = {}) => {
  Object.defineProperty(window, 'sessionStorage', {
    value: new FakeStorage(initialStore),
  });
};


// tomamos posse do objeto window.algumStorage logo, o mesmo arquivo não reseta para pular de teste para teste... mas o código abaixo não funcionou...
// export const unmountFakeStorage = (storageName) => {
//   delete window.storageName;
// }

// Pode-se passar um objeto como parâmetro quando invocado o novo objeto da classe fakeLocalStorage.

// ATENÇÃO! - o fake se comporta semelhante ao original:
// 1. O valor inicial deve ser um objeto, assim como o localStorage completo. Dentro de cada chave pode-se declarar outros tipos de dados. - Não passe esse objeto inicial stringficado.
// 2. Se não for uma string passada como valor para "localStorage.setItem(valor)", a chave não será setada.
// 3. O valor de retorno de getitem será sempre uma string
// 4. Igual tudo fora do git, deletou, acabou, cuidado com o delete! =P
// 5. o Objeto mockController pode ter seus métodos invocado para manipular o storage deacordo com a necessidade de cada teste, cabe aos restantes métodos serem utilizados pelo componente testado, e não em ajustes do storage mockado.

// describe("test window location's reload function", () => {
//   const original = window.location;

//   const reloadFn = () => {
//     window.location.reload(true);
//   };

//   beforeAll(() => {
//     Object.defineProperty(window, 'location', {
//       configurable: true,
//       value: { reload: jest.fn() },
//     });
//   });

//   afterAll(() => {
//     Object.defineProperty(window, 'location', { configurable: true, value: original });
//   });
