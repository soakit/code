/**
 * 策略模式进行表单校验
 * 1.将校验逻辑封装成Strategy对象
 * 2.实现Validator类。Validator类作为Context，接收用户的请求并委托给Strategy对象校验
 * 3.new Validator实例，添加策略并开始校验
 */
var strategies = {
    isNotEmpty: function(value, errorMsg){
        if (value === '' || value === undefined | value === null) {
            return errorMsg
        }
    },
    minLength: function(value, length, errorMsg) {
        if (value.length < length) {
            return errorMsg
        }
    }
}


var Validator = function() {
    this.cache = []
}

Validator.prototype.add = function(dom, rules) {
    var self = this;
    for (var i=0, rule; rule=rules[i]; i++) {
        (function(rule) {
            var strategyArr = rule.strategy.split(':')
            var errorMsg = rule.errorMsg

            self.cache.push(function() {
                var strategy = strategyArr.shift()
                strategyArr.unshift(dom.value)
                strategyArr.push(errorMsg)
                return strategies[strategy].apply(dom, strategyArr)
            })
        })(rule)
    }
}

Validator.prototype.start = function() {
    for (var i=0, ValidatorFn; ValidatorFn=this.cache[i]; i++) {
        var errorMsg = ValidatorFn()
        if (errorMsg) {
            return errorMsg
        }
    }
}


var registerForm = document.getElementById('register')
var validatorFunc = function() {
    var validator = new Validator()
    validator.add(registerForm.username, [{
        strategy: 'isNotEmpty',
        errorMsg: '用户名不能为空'
    }, {
        strategy: 'minLength:6',
        errorMsg: '用户名长度不能少于6位'
    }])

    return validator.start()
}

registerForm.onsubmit = function() {
    var errorMsg = validatorFunc()
    if (errorMsg){
        alert(errorMsg)
        return false
    }
}