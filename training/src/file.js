const { readFile } = require('fs/promises');

const DEFAULT_OPTIONS = {
  maxLines: 3,
  headers: ['id', 'name', 'status'],
};

class File {
  static async getFileContent(filePath) {
    return (await readFile(filePath)).toString('utf8');
  }
}

(async () => {
  const file = await File.getFileContent('./../mocks/three-rows-valid.csv');
  console.log(file);
})();
