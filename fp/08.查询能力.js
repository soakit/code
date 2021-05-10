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

Array.zip = function (left, right, combinerFunction) {
  var counter,
    results = [];

  const minLen = Math.min(left.length, right.length);
  for (counter = 0; counter < minLen; counter++) {
    results.push(combinerFunction(left[counter], right[counter]));
  }

  return results;
};

// 练习 25: 把数组转换成树
var lists = [
    {
      id: 5434364,
      name: "New Releases",
    },
    {
      id: 65456475,
      name: "Thrillers",
    },
  ],
  videos = [
    {
      listId: 5434364,
      id: 65432445,
      title: "The Chamber",
    },
    {
      listId: 5434364,
      id: 675465,
      title: "Fracture",
    },
    {
      listId: 65456475,
      id: 70111470,
      title: "Die Hard",
    },
    {
      listId: 65456475,
      id: 654356453,
      title: "Bad Boys",
    },
  ];

console.log(
  lists.map(function (list) {
    return {
      name: list.name,
      videos: videos
        .filter(function (video) {
          return video.listId === list.id;
        })
        .map(function (video) {
          return { id: video.id, title: video.title };
        }),
    };
  })
);

// 练习 26: 把数组转换成 更深层的 树
(function () {
  var lists = [
      {
        id: 5434364,
        name: "New Releases",
      },
      {
        id: 65456475,
        name: "Thrillers",
      },
    ],
    videos = [
      {
        listId: 5434364,
        id: 65432445,
        title: "The Chamber",
      },
      {
        listId: 5434364,
        id: 675465,
        title: "Fracture",
      },
      {
        listId: 65456475,
        id: 70111470,
        title: "Die Hard",
      },
      {
        listId: 65456475,
        id: 654356453,
        title: "Bad Boys",
      },
    ],
    boxarts = [
      {
        videoId: 65432445,
        width: 130,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg",
      },
      {
        videoId: 65432445,
        width: 200,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg",
      },
      {
        videoId: 675465,
        width: 200,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg",
      },
      {
        videoId: 675465,
        width: 120,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg",
      },
      {
        videoId: 675465,
        width: 300,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg",
      },
      {
        videoId: 70111470,
        width: 150,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg",
      },
      {
        videoId: 70111470,
        width: 200,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg",
      },
      {
        videoId: 654356453,
        width: 200,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg",
      },
      {
        videoId: 654356453,
        width: 140,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg",
      },
    ],
    bookmarks = [
      { videoId: 65432445, time: 32432 },
      { videoId: 675465, time: 3534543 },
      { videoId: 70111470, time: 645243 },
      { videoId: 654356453, time: 984934 },
    ];

  console.log(
    lists.map(function (list) {
      return {
        name: list.name,
        videos: videos
          .filter(function (video) {
            return video.listId === list.id;
          })
          // 二维变一维
          .concatMap(function (video) {
            return Array.zip(
              // 取得bookmarks
              bookmarks.filter(function (bookmark) {
                return bookmark.videoId === video.id;
              }),
              // 取得boxarts
              boxarts
                .filter(function (boxart) {
                  return boxart.videoId === video.id;
                })
                .reduceArr(function (acc, curr) {
                  return acc.width * acc.height < curr.width * curr.height
                    ? acc
                    : curr;
                }),
              // 进行计算
              function (bookmark, boxart) {
                return {
                  id: video.id,
                  title: video.title,
                  time: bookmark.time,
                  boxart: boxart.url,
                };
              }
            );
          }),
      };
    })
  );
})();
