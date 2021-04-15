// 练习 9: 把 movieLists 数组展开成包含 video 的 id 的数组
var movieLists = [
  {
    name: "New Releases",
    videos: [
      {
        id: 70111470,
        title: "Die Hard",
        boxart: "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
        uri: "http://api.netflix.com/catalog/titles/movies/70111470",
        rating: 4.0,
        bookmark: [],
      },
      {
        id: 654356453,
        title: "Bad Boys",
        boxart: "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
        uri: "http://api.netflix.com/catalog/titles/movies/70111470",
        rating: 5.0,
        bookmark: [{ id: 432534, time: 65876586 }],
      },
    ],
  },
  {
    name: "Dramas",
    videos: [
      {
        id: 65432445,
        title: "The Chamber",
        boxart: "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
        uri: "http://api.netflix.com/catalog/titles/movies/70111470",
        rating: 4.0,
        bookmark: [],
      },
      {
        id: 675465,
        title: "Fracture",
        boxart: "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
        uri: "http://api.netflix.com/catalog/titles/movies/70111470",
        rating: 5.0,
        bookmark: [{ id: 432534, time: 65876586 }],
      },
    ],
  },
];

var allVideoIdsInMovieLists = [];
movieLists.forEach((movieList) => {
  movieList.videos.forEach((video) => {
    allVideoIdsInMovieLists.push(video.id);
  });
});
console.log(allVideoIdsInMovieLists);

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

// 练习 11: 使用 map() 和 concatAll() 对 movieLists 进行投影和展开，获取包含所有 video 的 id 的数组
// 使用 map 和 concatAll 把 movieLists 打平成 video id 的数组。
console.log(
  movieLists.map((list) => list.videos.map((video) => video.id)).concatAll()
);

// 练习 12: 获取每个 video 的 id， title 和 150x200 大小的 box art url
function getData() {
  var movieLists = [
    {
      name: "Instant Queue",
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
              width: 150,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg",
            },
          ],
          url: "http://api.netflix.com/catalog/titles/movies/70111470",
          rating: 5.0,
          bookmark: [{ id: 432534, time: 65876586 }],
        },
      ],
    },
    {
      name: "New Releases",
      videos: [
        {
          id: 65432445,
          title: "The Chamber",
          boxarts: [
            {
              width: 150,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg",
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
              width: 150,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg",
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

  // 使用一个或者多个 map，concatAll，filter 方法拿到一个有下列元素的数组
  // [
  //     {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
  //     {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
  //     {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" },
  //     {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
  // ];

  return movieLists
    .map((list) =>
      list.videos
        .map((video) =>
          video.boxarts
            .filter((boxArt) => boxArt.width === 150 && boxArt.height === 200)
            .map((boxArt) => ({
              id: video.id,
              title: video.title,
              boxArt: boxArt.url,
            }))
        )
        .concatAll()
    )
    .concatAll();
}
console.log(getData());

// 练习 13: 实现 concatMap()
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
// test concatMap
var spanishFrenchEnglishWords = [
  ["cero", "rien", "zero"],
  ["uno", "un", "one"],
  ["dos", "deux", "two"],
];
// collect all the words for each number, in every language, in a single, flat list
var allWords = [0, 1, 2].concatMap(function (index) {
  return spanishFrenchEnglishWords[index];
});

console.log(
  JSON.stringify(allWords) ===
    '["cero","rien","zero","uno","un","one","dos","deux","two"]'
);

// 练习 14: 使用 concatMap() 去检索每一个视频的 id，title，和 boxarts url。
function getData2() {
  var movieLists = [
    {
      name: "Instant Queue",
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
              width: 150,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg",
            },
          ],
          url: "http://api.netflix.com/catalog/titles/movies/70111470",
          rating: 5.0,
          bookmark: [{ id: 432534, time: 65876586 }],
        },
      ],
    },
    {
      name: "New Releases",
      videos: [
        {
          id: 65432445,
          title: "The Chamber",
          boxarts: [
            {
              width: 150,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg",
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
              width: 150,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg",
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

  // 使用一个或者多个 concatMap, map，filter 方法拿到一个有下列元素的数组
  // [
  //     {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
  //     {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
  //     {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" },
  //     {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
  // ];

  return movieLists.concatMap((list) =>
    list.videos.concatMap((video) =>
      video.boxarts
        .filter((boxart) => boxart.width === 150 && boxart.height === 200)
        .map((boxart) => ({
          id: video.id,
          title: video.title,
          boxart: boxart.url,
        }))
    )
  );
}
console.log(getData2());
