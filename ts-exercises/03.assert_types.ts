// 3. 类型断言1: in
interface User {
  type: string;
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: string;
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  {
    type: "user",
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
  { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
  { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
];

export function logPerson(person: Person) {
  let additionalInformation: string;
  // 方案1:
  if ("role" in person) {
    additionalInformation = person.role;
  } else {
    additionalInformation = person.occupation;
  }
  // 方案2:
  //   if ((<Admin>person).role) {
  //     additionalInformation = (<Admin>person).role;
  //   } else {
  //     additionalInformation = (<User>person).occupation;
  //   }

  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

persons.forEach(logPerson);

// In case if you are stuck:
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-the-in-operator

// 类型断言2: is
export function isAdmin(person: Person): person is Admin {
  return person.type === "admin";
}

export function isUser(person: Person): person is User {
  return person.type === "user";
}

export function logPerson2(person: Person) {
  let additionalInformation: string = "";
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log('-----------------------------')
console.log("Admins:");
persons.filter(isAdmin).forEach(logPerson2);

console.log("Users:");
persons.filter(isUser).forEach(logPerson);
