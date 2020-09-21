// 联合类型
// 联合类型是要求只要符合联合类型中任意一种类型即可，它使用 | 符号定义。
// 当我们的程序具有多样性，元素类型不 唯一时，即使用联合类型。
// 例子1
function padLeft(value: string, padding: string | number | boolean) {
  // ...
}

let indentedString = padLeft("Hello world", true);
indentedString = padLeft("Hello world", "");
indentedString = padLeft("Hello world", 1);

// 例子2
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet() as Fish;
pet = <Fish>getSmallPet();
pet.layEggs();

// 有可能是Fish, 有可能是Bird，要在上面加上as Fish或范型，确定他的类型
pet.swim();

// 例子3
type NetworkLoadingState = {
  state: "loading";
};

type NetworkFailedState = {
  state: "failed";
  code: number;
};

type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};

type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;

function logger(state: NetworkState): string {
  // Right now TypeScript does not know which of the three
  // potential types state could be.

  // 如果试图访问不是所以类型共享的属性，将报错
  // state.code;

  // By switching on state, TypeScript can narrow the union
  // down in code flow analysis
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      // The type must be NetworkFailedState here,
      // so accessing the `code` field is safe
      return `Error ${state.code} downloading`;
    case "success":
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
    default:
      return assertNever(state);
  }
}

function assertNever(x: never): never {
  throw new Error("Unexpected object:" + x);
}

// 交叉类型
// 交叉类型就是取多个类型的并集，使用 & 符号定义，被&符链接的多个类型构成一个交叉类型
// 表示这个类型同时 具备这几个连接起来的类型的特点
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// These interfaces are composed to have
// consistent error handling, and their own data.

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }
  console.log(response.artists);
};

const handleArtworkResponse = (response: ArtworksResponse) => {
  if (response.error) {
    console.error(response.error.message)
    return
  }
  console.log(response.artworks)
}
