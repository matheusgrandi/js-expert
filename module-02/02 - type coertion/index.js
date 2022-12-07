const item = {
  name: 'Matheus Grandi',
  age: 30,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  valueOf() {
    return { hey: 'dude' };
  },
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to convert to', coercionType);
    const types = {
      string: JSON.stringify(this),
      number: '007',
    };
    return types[coercionType] || types.string;
  },
};

// console.log('toString', String(item));
// console.log('valueOf', Number(item));

console.assert(item + 0 === '{"name":"Matheus Grandi","age":30}0');
console.log('!!item is true?', !!item);
console.assert(!!item);
console.log('string concat', 'Ae'.concat(item));
console.assert('Ae'.concat(item) === 'Ae{"name":"Matheus Grandi","age":30}');
