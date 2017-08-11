var fs = require('fs');
var download = require('./download');
fs.readFile('./zhihu.json','utf-8',function (error,data) {
    var arr = data.split(',');
    var array = [];

    var re = /^http.{1,}.jpg$/g
    arr.forEach(function (item,index) {

        if (item.match(re)){
            console.log(item)
            array.push(item)
        }

    })

    array.forEach(function (item,index){
        download(item,'zhiHuImg',index +'.jpg')
    })

})