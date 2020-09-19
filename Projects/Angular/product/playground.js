/** @format */

class Animal {
  constructor(name) {
    this.name = name;
  }

  static animalCount() {
    console.log("There are 50 animals..!!");
  }

  logName() {
    console.log(`The animal name is ${this.name}`);
  }
}

let bull = new Animal("Bull");
bull.logName();
Animal.animalCount();

let details = {
  name: "Ajay",
  address: "3rd Street",
  city: "Nandyal",
  getDetails() {
    console.log(
      `Name is ${this.name}- Address is ${this.address}- city is ${this.city}`
    );
  },
};

console.log(Object.values(details));
