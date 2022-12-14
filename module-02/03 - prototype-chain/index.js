const assert = require('assert');

const obj = {};
const arr = [];
const fn = () => {};

// __proto__ é a referência do objeto que possui as propiedades dele
console.log('new Object() is {}?', new Object().__proto__ === {}.__proto__);
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

// o __proto__ de Object.prototype é null
