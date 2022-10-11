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
    const filePath = './mocks/fourRows-invalid.csv';
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/three-rows-valid.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        id: '123',
        name: 'Matheus Grandi',
        status: 'quantum leaping',
        createdAt: 11,
      },
      {
        id: '333',
        name: 'Antonio Nunes',
        status: 'batendo na coxa',
        createdAt: 11,
      },
      {
        id: '666',
        name: 'Lulanaro',
        status: 'roubando since always',
        createdAt: 11,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
