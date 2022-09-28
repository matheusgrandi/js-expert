const File = require('./src/file');
const { error } = require('./src/constants');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/threeItems-valid.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        id: 123,
        name: 'Matheus Grandi',
        profession: 'Software Enginieer',
        birthday: 1992,
      },
      {
        id: 321,
        name: 'Xuxa da Silva',
        profession: 'JS Especialist',
        birthday: 1933,
      },
      {
        id: 333,
        name: 'Mac Lovin',
        profession: 'Dating Expert',
        birthday: 1995,
      },
    ];
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
