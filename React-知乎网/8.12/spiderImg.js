var webpage = require('webpage')
var page = webpage.create();
phantom.outputEncoding = 'ytf-8';
var fs = require('fs');

page.open('http://daily.zhihu.com/',function (status) {
    if (status === 'success'){
        console.log('加载成功')
        page.includeJs("https://code.jquery.com/jquery-3.2.1.min.js",function () {
            setTimeout(function () {
                var $abc = page.evaluate(function () {
                    var arr = [];
                    $('img').each(function (index,element) {
                        arr.push($(element).attr('src'))
                    })
                    return arr
                })
                console.log($abc)
                fs.write('./zhihu.json',$abc,'w')
                phantom.exit(0)
            },5000)
        })
    }else{
        console.log('加载失败');
        phantom.exit(0)
    }
})

