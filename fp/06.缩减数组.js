// 练习 10: 实现 concatAll()
Array.prototype.concatAll = function () {
  var results = [];
  this.forEach(function (subArray) {
    // 方式1: 使用concat
    // results = results.concat(subArray);

    // 方式2: 使用push
    results.push.apply(results, subArray);
  });

  return results;
};
Array.prototype.concatMap = function (projectionFunctionThatReturnsArray) {
  return (
    this.map(function (item) {
      // 对每个元素都执行投影函数，这个函数会返回一个子数组，整个操作会产生一个二维数组
      return projectionFunctionThatReturnsArray(item);
    })
      // apply the concatAll function to flatten the two-dimensional array
      .concatAll()
  );
};

// 练习 15: 使用 forEach 找到最大的 box art
var boxarts = [
    {
      width: 200,
      height: 200,
      url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg",
    },
    {
      width: 150,
      height: 200,
      url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg",
    },
    {
      width: 300,
      height: 200,
      url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg",
    },
    {
      width: 425,
      height: 150,
      url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg",
    },
  ],
  currentSize,
  maxSize = -1,
  largestBoxart;

boxarts.forEach(function (boxart) {
  currentSize = boxart.width * boxart.height;
  if (currentSize > maxSize) {
    largestBoxart = boxart;
    maxSize = currentSize;
  }
});
console.log("largestBoxart:", largestBoxart, maxSize);

// 练习 16: 实现 reduceArr()
Array.prototype.reduceArr = function (combiner, initialValue) {
  var counter, accumulatedValue;

  // 如果数组是空，则直接返回
  if (this.length === 0) {
    return this;
  }

  const argsLen = arguments.length;
  if (argsLen === 1) {
    counter = 1;
    accumulatedValue = this[0];
  } else if (argsLen >= 2) {
    counter = 0;
    accumulatedValue = initialValue;
  } else {
    throw "Invalid arguments.";
  }

  while (counter < this.length) {
    accumulatedValue = combiner(accumulatedValue, this[counter]);
    counter++;
  }
  return [accumulatedValue];
  //   return accumulatedValue; // 原生的reduce是返回 accumulatedValue
};

// test
console.log(
  [1, 2, 3].reduceArr(function (accumulatedValue, currentValue) {
    return accumulatedValue + currentValue;
  })[0] === 6
);
console.log(
  [1, 2, 3].reduceArr(function (accumulatedValue, currentValue) {
    return accumulatedValue + currentValue;
  }, 10)[0] === 16
);

// 练习 17: 获取最大的 rating。
var ratings = [2, 3, 1, 4, 5];
console.log(
  "最大的数:",
  ratings.reduceArr(function (acc, curr) {
    if (acc > curr) {
      return acc;
    } else {
      return curr;
    }
  })
);

// 练习 18: 获取最大的 boxart 的 url
var boxarts = [
  {
    width: 200,
    height: 200,
    url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg",
  },
  {
    width: 150,
    height: 200,
    url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg",
  },
  {
    width: 300,
    height: 200,
    url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg",
  },
  {
    width: 425,
    height: 150,
    url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg",
  },
];

console.log(
  "最大的 boxart:",
  boxarts
    .reduceArr(function (acc, curr) {
      if (acc.width * acc.height > curr.width * curr.height) {
        return acc;
      } else {
        return curr;
      }
    })
    .map(function (boxart) {
      return boxart.url;
    })
);

// 练习 19: 带有初始值的缩减
var videos = [
  {
    id: 65432445,
    title: "The Chamber",
  },
  {
    id: 675465,
    title: "Fracture",
  },
  {
    id: 70111470,
    title: "Die Hard",
  },
  {
    id: 654356453,
    title: "Bad Boys",
  },
];
/* {
    "65432445": "The Chamber",
    "675465": "Fracture",
    "70111470": "Die Hard",
    "654356453": "Bad Boys"
} */
console.log(
  videos.reduceArr(function (accumulatedMap, video) {
    var copyOfAccumulatedMap = { ...accumulatedMap };
    copyOfAccumulatedMap[video.id] = video.title;
    return copyOfAccumulatedMap;
  }, {})
);

// 练习 20: 取出每个 video的 id，title 以及最小的 boxart 的 url。
var movieLists = [
  {
    name: "New Releases",
    videos: [
      {
        id: 70111470,
        title: "Die Hard",
        boxarts: [
          {
            width: 150,
            height: 200,
            url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg",
          },
          {
            width: 200,
            height: 200,
            url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg",
          },
        ],
        url: "http://api.netflix.com/catalog/titles/movies/70111470",
        rating: 4.0,
        bookmark: [],
      },
      {
        id: 654356453,
        title: "Bad Boys",
        boxarts: [
          {
            width: 200,
            height: 200,
            url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg",
          },
          {
            width: 140,
            height: 200,
            url: "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg",
          },
        ],
        url: "http://api.netflix.com/catalog/titles/movies/70111470",
        rating: 5.0,
        bookmark: [{ id: 432534, time: 65876586 }],
      },
    ],
  },
  {
    name: "Thrillers",
    videos: [
      {
        id: 65432445,
        title: "The Chamber",
        boxarts: [
          {
            width: 130,
            height: 200,
            url: "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg",
          },
          {
            width: 200,
            height: 200,
            url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg",
          },
        ],
        url: "http://api.netflix.com/catalog/titles/movies/70111470",
        rating: 4.0,
        bookmark: [],
      },
      {
        id: 675465,
        title: "Fracture",
        boxarts: [
          {
            width: 200,
            height: 200,
            url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg",
          },
          {
            width: 120,
            height: 200,
            url: "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg",
          },
          {
            width: 300,
            height: 200,
            url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg",
          },
        ],
        url: "http://api.netflix.com/catalog/titles/movies/70111470",
        rating: 5.0,
        bookmark: [{ id: 432534, time: 65876586 }],
      },
    ],
  },
];

// 使用一个或多个 concatMap， map，和 reduceArr 操作得到下面的数组（顺序无关）。
// [
//     {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
//     {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
//     {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" },
//     {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
// ];
console.log(
  movieLists.concatMap((movieList) =>
    movieList.videos.concatMap((video) =>
      video.boxarts
        .reduceArr((acc, curr) => {
          if (acc.width * acc.height < curr.width * curr.height) {
            return acc;
          } else {
            return curr;
          }
        })
        .map((boxart) => ({
          id: video.id,
          title: video.title,
          boxart: boxart.url,
        }))
    )
  )
);
