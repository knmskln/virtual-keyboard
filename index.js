const body = document.querySelector('body');
const textarea = document.createElement('textarea');
textarea.classList.add('textarea');
body.appendChild(textarea);

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard', 'keyboard-hidden');
    this.elements.keysContainer.classList.add('keyboard-symbols');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard-symbol');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll('.textarea').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          /* eslint-disable-next-line */
          element.value = currentValue;
        });
      });
    });
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      'close',
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '/', 'del',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl',
    ];

    const createName = (name) => `<p>${name}</p>`;

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'del', 'enter', '?'].indexOf(key) !== -1;
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard-symbol');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard-symbol-large');
          keyElement.innerHTML = createName('backspace');
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1,
            );
            this.triggerEvent('oninput');
          });
          break;

        case 'del':
          keyElement.innerHTML = createName('del');

          break;

        case 'caps':
          keyElement.classList.add('keyboard-symbol-large', 'keyboard-symbol-activatable');
          keyElement.innerHTML = createName('caps');
          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard-symbol-active', this.properties.capsLock);
          });
          break;

        case 'enter':
          keyElement.classList.add('keyboard-symbol-large');
          keyElement.innerHTML = createName('enter');
          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });
          break;

        case 'ctrl':
          keyElement.innerHTML = createName('ctrl');
          break;

        case 'win':
          keyElement.innerHTML = createName('win');
          break;

        case 'tab':
          keyElement.classList.add('keyboard-symbol-large');
          keyElement.innerHTML = createName('tab');
          keyElement.addEventListener('click', () => {
            this.properties.value += '  ';
            this.triggerEvent('oninput');
          });
          break;

        case 'shift':
          keyElement.classList.add('keyboard-symbol-large');
          keyElement.innerHTML = createName('shift');
          break;

        case 'alt':
          keyElement.innerHTML = createName('alt');
          break;

        case 'space':
          keyElement.classList.add('keyboard-symbol-big');
          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });
          break;

        case 'close':
          keyElement.classList.add('keyboard-symbol-large');
          keyElement.innerHTML = createName('close');
          keyElement.addEventListener('click', () => {
            this.close();
            this.triggerEvent('onclose');
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase()
              : key.toLowerCase();
            this.triggerEvent('oninput');
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });
    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    /* eslint-disable-next-line */
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard-hidden');
  },

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard-hidden');
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
