// 练习 21: 按数组下标顺序合并 videos 和 bookmarks
var videos = [
    {
      id: 70111470,
      title: "Die Hard",
      boxart: "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
      uri: "http://api.netflix.com/catalog/titles/movies/70111470",
      rating: 4.0,
    },
    {
      id: 654356453,
      title: "Bad Boys",
      boxart: "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
      uri: "http://api.netflix.com/catalog/titles/movies/70111470",
      rating: 5.0,
    },
    {
      id: 65432445,
      title: "The Chamber",
      boxart: "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
      uri: "http://api.netflix.com/catalog/titles/movies/70111470",
      rating: 4.0,
    },
    {
      id: 675465,
      title: "Fracture",
      boxart: "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
      uri: "http://api.netflix.com/catalog/titles/movies/70111470",
      rating: 5.0,
    },
  ],
  bookmarks = [
    { id: 470, time: 23432 },
    { id: 453, time: 234324 },
    { id: 445, time: 987834 },
  ],
  counter,
  videoIdAndBookmarkIdPairs = [];

for (
  var counter = 0;
  counter < Math.min(videos.length, bookmarks.length);
  counter++
) {
  videoIdAndBookmarkIdPairs.push({
    videoId: videos[counter].id,
    bookmarkId: bookmarks[counter].id,
  });
}

// 练习 22: 实现 zip
Array.zip = function (left, right, combinerFunction) {
  var counter,
    results = [];

  const minLen = Math.min(left.length, right.length);
  for (counter = 0; counter < minLen; counter++) {
    results.push(combinerFunction(left[counter], right[counter]));
  }

  return results;
};

console.log(
  JSON.stringify(
    Array.zip([1, 2, 3], [4, 5, 6], function (left, right) {
      return left + right;
    })
  ) === "[5,7,9]"
);

// 练习 23: 按数组下标顺序合并 videos 和 bookmarks
console.log(
  Array.zip(videos, bookmarks, ({ id: videoId }, { id: bookmarkId }) => {
    return {
      videoId,
      bookmarkId,
    };
  })
);

// 练习 24: 取出每个 video 的 id，title，middle 类型的 interesting moment time, 和 最小的 box art url.
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
        interestingMoments: [
          { type: "End", time: 213432 },
          { type: "Start", time: 64534 },
          { type: "Middle", time: 323133 },
        ],
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
        interestingMoments: [
          { type: "End", time: 54654754 },
          { type: "Start", time: 43524243 },
          { type: "Middle", time: 6575665 },
        ],
      },
    ],
  },
  {
    name: "Instant Queue",
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
        interestingMoments: [
          { type: "End", time: 132423 },
          { type: "Start", time: 54637425 },
          { type: "Middle", time: 3452343 },
        ],
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
        interestingMoments: [
          { type: "End", time: 45632456 },
          { type: "Start", time: 234534 },
          { type: "Middle", time: 3453434 },
        ],
      },
    ],
  },
];

// 连接数组
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

// 二维变一维
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

console.log(
  movieLists.concatMap((movieList) => {
    return movieList.videos.concatMap((video) => {
      return Array.zip(
        video.boxarts.reduceArr((acc, curr) => {
          if (acc.width * acc.height < curr.width * curr.height) {
            return acc;
          }
          return curr;
        }),
        video.interestingMoments.filter((moment) => moment.type === "Middle"),
        (boxart, moment) => ({
          id: video.id,
          title: video.title,
          time: moment.time,
          url: boxart.url,
        })
      );
    });
  })
);
