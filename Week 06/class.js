class Dog {
  constructor(name) {
    this.name = name;
  }
}
class Person {
  constructor(name) {
    this.name = name;
  }
  hurt(damage) {
    console.log(`${damage.content} hurt by ${damage.by}!`);
  }
}

const puppy = new Dog("puppy");
const lili = new Person("name");
lili.hurt({ by: puppy.name, content: "hand" });
