/**
# test-app.77ircloud.com weinre://app

# 新
/77ircloud\.com\/manage\/pages\/v2/ http://127.0.0.1:10086/manage/pages/$1

# 旧
/77ircloud\.com\/manage\/pages\/(?!v2)/ http://127.0.0.1:10087/manage/pages/$1

# 根据referer去到10086或10087
vase://static-file /77ircloud\.com(\/js\/|\/chunk\/|\/css\/|\/static\/)/

**/

const reg = /(\/css\/|\/js\/|\/chunk\/|\/static\/)(.+)/;
const matches = req.url.match(reg);
const imgReg = /\.(png|jpe?g|gif|svg)(\?.*)?$/;
const imgMatches = req.url.match(imgReg);
const headers = {};

if (req.headers.referer.indexOf("/manage/pages/") !== -1) {
  // out('req.headers.referer:'+ req.headers.referer)
  // 来源于旧的项目
  if (req.headers.referer.indexOf("/v2") === -1) {
    if (matches && matches.length) {
      // out('http://127.0.0.1:10087' + matches[0]);

      if (imgMatches && imgMatches.length && imgMatches[1]) {
        const type = getContentTypeByExt(imgMatches[1]);
        headers["content-type"] = type + " charset=utf8";
      }

      out(
        get({
          url: "http://127.0.0.1:10087" + matches[0],
          headers,
        })
      );
    }
  } else {
    if (matches && matches.length) {
      if (imgMatches && imgMatches.length && imgMatches[1]) {
        const type = getContentTypeByExt(imgMatches[1]);
        headers["content-type"] = type + "; charset=utf8";
      }

      out(
        get({
          url: "http://127.0.0.1:10086" + matches[0],
          headers,
        })
      );
    }
  }
}

function getContentTypeByExt(ext) {
  let imgMime;
  switch (ext) {
    case "jpg":
      imgMime = "image/jpeg";
      break;
    case "svg":
      imgMime = "image/svg+xml";
      break;
    default:
      imgMime = "image/" + ext;
      break;
  }
  return imgMime;
}
