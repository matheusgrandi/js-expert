'use strict';

const {
  watch,
  promises: { readFile },
} = require('fs');

class File {
  watch(event, filename) {
    console.log('this', this);
    console.log('arguments', Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }
  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

const file = new File();

// Para não perder o this em callbacks, podemos utilizar os seguintes métodos:
// #1: Bind
//watch(__filename, file.watch.bind(this));
// #2: Call
// file.watch.call(
//   { showContent: () => console.log('call: hey sinon!') },
//   null,
//   __filename
// );
// #3: Apply
file.watch.apply({ showContent: () => console.log('call: hey sinon!') }, [
  null,
  __filename,
]);
