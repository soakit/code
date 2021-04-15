// 练习 6: 使用 forEach() 收集那些评分（rating) 为 5.0 的 video
var newReleases = [
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
];

var videos = [];
newReleases.forEach((video) => {
  if (video.rating === 5.0) {
    videos.push(video.id);
  }
});
console.log(videos);

// 练习 7: 实现 filter()
Array.prototype.filter = function (predicateFunction) {
  var results = [];
  this.forEach(function (itemInArray) {
    if (predicateFunction(itemInArray)) {
      results.push(itemInArray);
    }
  });
  return results;
};

// 练习 8: 链式调用 filter 和 map，收集 video 当中 rating 为 0.5 的那些 video 的 id。
console.log(
  // 结合 filter 和 map 方法，拿到所有 rating 为 5.0 的 video 的 id。
  newReleases.filter((video) => video.rating === 5.0).map((video) => video.id)
);
