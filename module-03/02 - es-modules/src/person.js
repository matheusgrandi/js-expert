export default class Person {
  constructor({ id, vehicles, kmTraveled, form, to }) {
    this.id = id;
    this.vehicles = vehicles;
    this.kmTraveled = kmTraveled;
    this.form = form;
    this.to = to;
  }

  formatted(language) {
    return {
      id: Number(this.id),
      vehicles: new Intl.ListFormat(language, {
        style: 'long',
        type: 'conjunction',
      }).format(this.vehicles),
      kmTraveled: new Intl.NumberFormat(language, {
        style: 'unit',
        unit: 'kilometer',
      }).format(this.kmTraveled),
      from: new Intl.DateTimeFormat(language, {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }).format(this.from),
      to: new Intl.DateTimeFormat(language, {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }).format(this.from),
    };
  }
}
