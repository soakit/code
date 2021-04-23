// 6. 泛型 与 函数重载
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

// 8. Omit
type PowerUser = Omit<User, "type"> &
  Omit<Admin, "type"> & {
    type: "powerUser";
  };

export type Person = User | Admin | PowerUser;

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
  { type: "user", name: "Wilson", age: 23, occupation: "Ball" },
  { type: "admin", name: "Agent Smith", age: 23, role: "Anti-virus engineer" },
];

export function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${
      person.type === "admin" ? person.role : person.occupation
    }`
  );
}

export function filterPersons(
  persons: Person[],
  personType: "admin",
  criteria: Partial<Omit<Admin, "type">>
): Admin[];
export function filterPersons(
  persons: Person[],
  personType: "user",
  criteria: Partial<Omit<User, "type">>
): User[];
export function filterPersons(
  persons: Person[],
  personType: string,
  criteria: Partial<Person>
): Person[] {
  return persons
    .filter((person) => person.type === personType)
    .filter((person) => {
      let criteriaKeys = Object.keys(criteria) as (keyof Person)[];
      return criteriaKeys.every((fieldName) => {
        return person[fieldName] === criteria[fieldName];
      });
    });
}

export const usersOfAge23 = filterPersons(persons, "user", { age: 23 });
export const adminsOfAge23 = filterPersons(persons, "admin", { age: 23 });

console.log("Users of age 23:");
usersOfAge23.forEach(logPerson);

console.log();

console.log("Admins of age 23:");
adminsOfAge23.forEach(logPerson);

// https://www.typescriptlang.org/docs/handbook/functions.html#overloads

// 7.交换函数
function swap<T, U>(v1: T, v2: U): [U, T] {
  return [v2, v1];
}
// https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple
// https://www.typescriptlang.org/docs/handbook/generics.html

// 范型示例：基础
function id<T>(arg: T): T {
  return arg;
}
id<string>("lucifer"); // 完整的写法
id("lucifer"); // 基于类型推导，可以简写

// 范型示例：默认参数
type A<T = string> = Array<T>;
const bb: A = ["1"]; // ok
const cc: A<number> = [1]; // ok

// 范型示例：
interface Seal {
  name: string;
  url: string;
}
interface API {
  "/user": { name: string; age: number; phone: string };
  "/seals": { seal: Seal[] };
}
const api = <URL extends keyof API>(url: URL): Promise<API[URL]> => {
  return fetch(url).then((res) => res.json());
};

// 使用极其方便
api("/seals").then((res) => res.seal);
api("/user").then((res) => res.age);

// 9.范型使用
export type ApiResponse<T> =
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      error: string;
    };

export function requestAdmins(
  callback: (response: ApiResponse<Admin[]>) => void
) {
  callback({
    status: "success",
    data: admins,
  });
}

const admins: Admin[] = [
  { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
  { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
];

const users: User[] = [
  {
    type: "user",
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
];

type typeCallBack<T> = (fn: (response: ApiResponse<T>) => void) => void;
// typeCallBack是一个函数签名，没有返回值
// typeCallBack函数参数是fn，没有返回值
// response是fn的参数，类型是ApiResponse<T>

export function requestUsers(
  callback: (response: ApiResponse<User[]>) => void
) {
  callback({
    status: "success",
    data: users,
  });
}

export function requestCurrentServerTime(
  callback: (response: ApiResponse<number>) => void
) {
  callback({
    status: "success",
    data: Date.now(),
  });
}

export function requestCoffeeMachineQueueLength(
  callback: (response: ApiResponse<number>) => void
) {
  callback({
    status: "error",
    error: "Numeric value has exceeded Number.MAX_SAFE_INTEGER.",
  });
}

function startTheApp(callback: (error: Error | null) => void) {
  requestAdmins((adminsResponse) => {
    console.log("Admins:");
    if (adminsResponse.status === "success") {
      adminsResponse.data.forEach(logPerson);
    } else {
      return callback(new Error(adminsResponse.error));
    }

    console.log();

    requestUsers((usersResponse) => {
      console.log("Users:");
      if (usersResponse.status === "success") {
        usersResponse.data.forEach(logPerson);
      } else {
        return callback(new Error(usersResponse.error));
      }

      console.log();

      requestCurrentServerTime((serverTimeResponse) => {
        console.log("Server time:");
        if (serverTimeResponse.status === "success") {
          console.log(
            `   ${new Date(serverTimeResponse.data).toLocaleString()}`
          );
        } else {
          return callback(new Error(serverTimeResponse.error));
        }

        console.log();

        requestCoffeeMachineQueueLength((coffeeMachineQueueLengthResponse) => {
          console.log("Coffee machine queue length:");
          if (coffeeMachineQueueLengthResponse.status === "success") {
            console.log(`   ${coffeeMachineQueueLengthResponse.data}`);
          } else {
            return callback(new Error(coffeeMachineQueueLengthResponse.error));
          }

          callback(null);
        });
      });
    });
  });
}

startTheApp((e: Error | null) => {
  console.log();
  if (e) {
    console.log(
      `Error: "${e.message}", but it's fine, sometimes errors are inevitable.`
    );
  } else {
    console.log("Success!");
  }
});

// In case if you are stuck:
// https://www.typescriptlang.org/docs/handbook/generics.html

// 10.范型示例：promise
type CallbackBasedAsyncFunction<T> = (
  callback: (response: ApiResponse<T>) => void
) => void;
type PromiseBasedAsyncFunction<T> = () => Promise<T>;

function promisify<T>(
  fn: CallbackBasedAsyncFunction<T>
): PromiseBasedAsyncFunction<T> {
  return () =>
    new Promise<T>((resolve, reject) => {
      fn((response) => {
        if (response.status === "success") {
          resolve(response.data);
        } else {
          reject(new Error(response.error));
        }
      });
    });
}

type SourceObject<T> = { [K in keyof T]: CallbackBasedAsyncFunction<T[K]> };
type PromisifiedObject<T> = { [K in keyof T]: PromiseBasedAsyncFunction<T[K]> };

export function promisifyAll<T extends { [key: string]: any }>(
  obj: SourceObject<T>
): PromisifiedObject<T> {
  const result: Partial<PromisifiedObject<T>> = {};
  for (const key of Object.keys(obj) as (keyof T)[]) {
    result[key] = promisify(obj[key]);
  }
  return result as PromisifiedObject<T>;
}

const oldApi = {
  requestAdmins(callback: (response: ApiResponse<Admin[]>) => void) {
    callback({
      status: "success",
      data: admins,
    });
  },
  requestUsers(callback: (response: ApiResponse<User[]>) => void) {
    callback({
      status: "success",
      data: users,
    });
  },
  requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) {
    callback({
      status: "success",
      data: Date.now(),
    });
  },
  requestCoffeeMachineQueueLength(
    callback: (response: ApiResponse<number>) => void
  ) {
    callback({
      status: "error",
      error: "Numeric value has exceeded Number.MAX_SAFE_INTEGER.",
    });
  },
};

promisifyAll(oldApi);
