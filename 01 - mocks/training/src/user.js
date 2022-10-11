class User {
  constructor({ id, name, status }) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.createdAt = new Date().getDate();
  }
}

module.exports = User;
