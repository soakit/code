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

// https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types

interface P {
  name: string;
  age: number;
}
// 取得对象的所有key的联合签名
type PersonAttrs = keyof P; // 'name' | 'age'

let p: PersonAttrs = 'age'

const v = {
  a: 1,
  b: 2,
};
// 取得对象的所有key的联合签名的数组
// 方式1
const getObjectKeys0 = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;

// 方式2
// function getObjectKeys1<T extends object>(obj: T): (keyof T)[] {
function getObjectKeys1<T>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

let keys0 = getObjectKeys0(v); // ("a" | "b")[]
keys0 = ["a", "b"];
// keys0 = ["a", "b", "c"]; // error，只能是"a" | "b"

let keys1 = getObjectKeys1(v); // ("a" | "b")[]
keys1 = ["a", "b"];
// keys1 = ["a", "b", "c"]; // error，只能是"a" | "b"

const values = getObjectKeys1(v).reduce((accumulator, current) => {
  accumulator.push(v[current]);
  return accumulator;
}, []);
console.log(values);
