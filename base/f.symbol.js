var mySymbol = function (description) {
    var descString = description === undefined ? undefined : String(description)

    var symbol = Object.create({})

    Object.defineProperties(symbol, {
        'value': {
            value: descString + Math.random(),
            writable: false,
            enumerable: false,
            configurable: false
        }
    });

    return symbol;
}

// test
console.log(mySymbol('a') === mySymbol('a'))