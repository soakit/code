// 5. 工具类型：
// https://www.typescriptlang.org/docs/handbook/utility-types.html
// Omit<Type, Keys>：
// 通过从Type中选取所有除Keys之外属性来构造类型。(Keys是字符串或联合字符串)

// Partial<Type>
// 将类型的属性变成可选。
// 注意这是浅 Partial，深的DeepPartial 要配合递归调用使用。
type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

type PartialedWindow = DeepPartial<Window>; // window 上所有递归属性都变成可选

interface User {
  type: "user";
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: "admin";
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
  {
    type: "admin",
    name: "Jane Doe",
    age: 32,
    role: "Administrator",
  },
  {
    type: "user",
    name: "Kate Müller",
    age: 23,
    occupation: "Astronaut",
  },
  {
    type: "admin",
    name: "Bruce Willis",
    age: 64,
    role: "World saver",
  },
  {
    type: "user",
    name: "Wilson",
    age: 23,
    occupation: "Ball",
  },
  {
    type: "admin",
    name: "Agent Smith",
    age: 23,
    role: "Administrator",
  },
];

export const isAdmin = (person: Person): person is Admin =>
  person.type === "admin";
export const isUser = (person: Person): person is User =>
  person.type === "user";

export function logPerson(person: Person) {
  let additionalInformation = "";
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

export function filterUsers(
  persons: Person[],
  //   criteria: User // your code here
  criteria: Partial<Omit<User, "type">>
): User[] {
  return persons.filter(isUser).filter((user) => {
    const criteriaKeys = Object.keys(criteria) as (keyof Omit<User, "type">)[];
    return criteriaKeys.every((fieldName) => {
      return user[fieldName] === criteria[fieldName];
    });
  });
}

console.log("Users of age 23:");

filterUsers(persons, {
  age: 23,
}).forEach(logPerson);
