const { readFile } = require('fs/promises');
const { error } = require('./constants');
const User = require('./user');

const DEFAULT_OPTIONS = {
  maxLines: 3,
  headers: ['id', 'name', 'status'],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    if (!validation.valid) throw new Error(validation.error);
    return File.parseCSVToJSON(content);
  }

  static isValid(csv_string, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csv_string.split('\n');
    const isHeaderValid = header === options.headers.join();
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    const isContentLengthAccepted =
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines;

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return {
      valid: true,
    };
  }

  static parseCSVToJSON(csv_string) {
    const lines = csv_string.split('\n');
    const firstLine = lines.shift();
    const header = firstLine.split(',');
    const users = lines.map((line) => {
      const columns = line.split(',');
      let user = {};
      for (const index in columns) {
        user[header[index]] = columns[index];
      }
      return new User(user);
    });
    return users;
  }

  static async getFileContent(filePath) {
    return (await readFile(filePath)).toString('utf8');
  }
}

(async () => {
  const file = await File.csvToJson('./../mocks/three-rows-valid.csv');
  console.log(file);
})();
