// JSON parse
// 方式一、
function parseJson(jsonStr) {
    return eval('(' + jsonStr + ')')
}

// 方式二、
function parseJson2(jsonStr) {
    return (new Function('return ' + jsonStr))()
}

// JSON stringify
function stringifyJson(jsonObj) {
    var result = '',
        curVal;
    if (jsonObj === null) {
        return String(jsonObj);
    }

    switch (typeof jsonObj) {
        case 'number':
        case 'boolean':
            return String(jsonObj);
        case 'string':
            return '"' + jsonObj + '"';
        case 'undefined':
        case 'function': // JSON里没有function
            return undefined;
    }

    switch (Object.prototype.toString.call(jsonObj)) {
        case '[object Array]':
            result += '[';
            for (var i = 0, len = jsonObj.length; i < len; i++) {
                curVal = JSON.stringify(jsonObj[i]);
                result += (curVal === undefined ? null : curVal) + ",";
            }
            if (result !== '[') {
                result = result.slice(0, -1);
            }
            result += ']';
            return result;
        case '[object Date]':
            return '"' + (jsonObj.toJSON ? jsonObj.toJSON() : jsonObj.toString()) + '"';
        case '[object RegExp]':
            return "{}";
        case '[object Object]':
            result += '{';
            for (i in jsonObj) {
                if (jsonObj.hasOwnProperty(i)) {
                    curVal = JSON.stringify(jsonObj[i]);
                    if (curVal !== undefined) {
                        result += '"' + i + '":' + curVal + ',';
                    }
                }
            }
            if (result !== '{') {
                result = result.slice(0, -1); // 将最后的逗号去掉
            }
            result += '}';
            return result;

        case '[object String]':
            return '"' + jsonObj.toString() + '"';
        case '[object Number]':
        case '[object Boolean]':
            return jsonObj.toString();
    }
}