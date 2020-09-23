class Person {
  // static props
  static title: string = "Greeter";
  // props
  greeting: string;

  private _fullName: string = "";

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    this._fullName = newName;
  }

  #innerGreeting: string;

  constructor(message: string) {
    this.greeting = message;
    this.#innerGreeting = message;
  }

  static getClassName() {
    return "class name is Greeter";
  }

  greet() {
    return "hello, " + this.greeting + "\n" + this.#innerGreeting;
  }
}

let p1 = new Person("John");
console.log(p1.greeting);
console.log(p1.greet());


abstract class Animal {
    constructor(
        public name: string
    ) {

    }

    abstract say(words: string) : void;
}

type Y = 'Y'
type W = 'W'
type AgeType = 'Y' | 'W'
class Human extends Animal {
    say(words: string) {
        console.log("I'm a human being")
    }
    getAgeByType(typ: Y);
    getAgeByType(typ: W);
    getAgeByType(typ) {
        console.log(typ)
    }
}