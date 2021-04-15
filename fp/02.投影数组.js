// 练习 3: 使用 forEach 函数把一个包含 video 信息的数组投影成包含 {id,title} 对的新数组
var newReleases = [
  {
    id: 70111470,
    title: "Die Hard",
    boxart: "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
    uri: "http://api.netflix.com/catalog/titles/movies/70111470",
    rating: [4.0],
    bookmark: [],
  },
  {
    id: 654356453,
    title: "Bad Boys",
    boxart: "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
    uri: "http://api.netflix.com/catalog/titles/movies/70111470",
    rating: [5.0],
    bookmark: [{ id: 432534, time: 65876586 }],
  },
  {
    id: 65432445,
    title: "The Chamber",
    boxart: "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
    uri: "http://api.netflix.com/catalog/titles/movies/70111470",
    rating: [4.0],
    bookmark: [],
  },
  {
    id: 675465,
    title: "Fracture",
    boxart: "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
    uri: "http://api.netflix.com/catalog/titles/movies/70111470",
    rating: [5.0],
    bookmark: [{ id: 432534, time: 65876586 }],
  },
];

var videoAndTitlePairs = [];
// 使用forEach
newReleases.forEach((video) => {
  videoAndTitlePairs.push({ id: video.id, title: video.title });
});
console.log(videoAndTitlePairs);

// 练习 4: 实现 map()
Array.prototype.map = function (projectionFunction) {
  var results = [];
  this.forEach(function (itemInArray) {
    results.push(projectionFunction(itemInArray));
  });
  return results;
};

// 练习 5: 使用 map() 把一个 videos 数组投影成 {id,title} 对数组
console.log(newReleases.map((video) => ({ id: video.id, title: video.title })));
