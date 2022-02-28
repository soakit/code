/**
# test-app.77ircloud.com weinre://app

# 新
/77ircloud\.com\/manage\/pages\/v2/ http://127.0.0.1:10086/manage/pages/$1
# 旧
/77ircloud\.com\/manage\/pages\/(?!v2)/ http://127.0.0.1:10087/manage/pages/$1
# 根据referer去到10086或10087
vase://static-file /77ircloud\.com(\/js\/|\/chunk\/|\/css\/)/

# vase 图片的返回头是text/html
/77ircloud\.com\/static\// 127.0.0.1:10086 includeFilter://reqH:referer=/v2
/77ircloud\.com\/static\// 127.0.0.1:10087 excludeFilter://reqH:referer=/v2

**/
const reg = /(\/css\/|\/js\/|\/chunk\/)(.+)/;
const matches = req.url.match(reg);

if (req.headers.referer.indexOf("/manage/pages/") !== -1) {
  // out('req.headers.referer:'+ req.headers.referer)
  // 来源于旧的项目
  if (req.headers.referer.indexOf("/v2") === -1) {
    if (matches && matches.length) {
      // out('http://127.0.0.1:10087' + matches[0]);
      out(
        get({
          url: "http://127.0.0.1:10087" + matches[0],
        })
      );
    }
  } else {
    if (matches && matches.length) {
      out(
        get({
          url: "http://127.0.0.1:10086" + matches[0],
        })
      );
    }
  }
}
