# stylus

> ### 什么是 CSS 预处理器?
>
> 主要有三种：Sass、LESS、Stylus

CSS 预处理器是一种语言<u>**用来为 CSS 增加一些编程的的特性**</u>，无需考虑浏览器的兼容性问题

例如你可以在 CSS 中使用变量、简单的程序逻辑、函数等等在编程语言中的一些基本技巧

可以让CSS 更见简洁，适应性更强，代码更直观等诸多好处。



### 安装：

全局安装stylus

```
$ npm install stylus -g
```

建立一个stylusExample文件

```
$ mkdir stylusExample
```

在文件夹里建立建立src文件夹  用来存放stylus文件

```
$ mkdir src
```

建立stylus文件

```
$ touch example.styl
```

建立一个css文件

```
$ touch style.css
```

输出命令  stylus -w example.styl -o style.css(-w 是自动监视文件 -o 是将编译后的CSS文件输出到指定文件中)

```
$ stylus -w example.styl -o style.css
```



### stylus基础知识

> 书写习惯

> 没有分号、花括号、逗号也是可以执行的



styl

```
*
	margin 0
	padding	0
```

翻译后的css

```
*{
  margin:0;
  padding:0;
}
```

#### 变量

styl

```
font-size = 16px  //单一变量
font = 12px/16px '微软雅黑' //变量表达式
$width = 16px	//可以带标识符
a
	font font		//直接引用单一变量
	width $width	//直接饮用变量表达式
	margin-left(@width/2)	//可以用@来访问该属性当前对应的值
```

编译后的css

```
a{
  font:0.75px '微软雅黑';
  width: 16px;
  margin-left: 8px;
}
```

#### 用类似CSS的方式开发

> Stylus 可以用结构来表现css层级关系

```
body
	color red
	ul
		line-height 20px
		height 20px
		font-size 16px
		li
			display inline-block
			padding 10px
			border 1px solid #ccc
			text-algin center
			a
				color red
				font-size 12px
```

翻译后的css

```
body {
  color: #f00;
}
body ul {
  line-height: 20px;
  height: 20px;
  font-size: 16px;
}
body ul li {
  display: inline-block;
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}
body ul li a {
  color: #f00;
  font-size: 12px;
}

```

#### 参数

> 例如CSS3私有属性，每次都要输入很麻烦，可以采用传参数的形式来解决

styl

```
vender(n,arg)     //{}可以用来传参数
    -webkit-{n} arg
    -moz-{n} arg
    {n} arg
border-radius()   //一定要加括号
    vender('border-raidus',arguments)  //arguments默认参数
ul
    border-radius 2px  //只需要写border-radius的值即可
```

翻译后的css

```
ul {
  -webkit-border-raidus: 2px;
  -moz-border-raidus: 2px;
  border-raidus: 2px;
}
```

#### 方法function

> 很强大的功能，CSS也可以用写函数的方式来做，同时还会有返回值

styl

```
add(a,b=a)	//只有一个参数也可以计算
	a = unit(a,px)	//把单位都变成px
	b = unit(b,px)	//把单位都变成px
	return a b a+b //可以返回多个值，通过[0][1][2]调用
li
	width add(14px)[0]
	height add(14px,20px)[1]
	font-size add(14px,20px)[2]
```

翻译后的css

```
li {
  width: 14px;
  height: 20px;
  font-size: 34px;
}
```

### stylus_基础语法（条件/循环/@import/@media/@extend）

#### 1.条件

> 因为有了条件，才受控制，才可以称得上是动态语言

* if/else
* unless(除非)

styl

```
box(x,y,margin-only = false)
    if margin-only
        margin x y
    else 
        padding x y
p
    box(5px, 10px, true)
```

编译后的css

```
p {
  margin: 5px 10px;
}
```

#### 2.循环迭代

> 可以循环取值，也可以循环赋值
>
> 语法 for <val-name> [key-name] in <express>	

styl

```
p
    for bbbb in 2 3 4 5 6 7
        foo bbbb
    for a ,i in
```

编译后的css

```
p {
  foo: 2;
  foo: 3;
  foo: 4;
  foo: 5;
  foo: 6;
  foo: 7;
}
```

#### 3.@import

> 支持导入其他stylus样式;

#### 4.@media

>@media工作原理和在常规CSS中一样，但是，要使用Stylus的块状符号。

styl

```
@media print
  #header
  #footer
    display none
```

css

```
@media print {
  #header,
  #footer {
    display: none;
  }
}
```

#### 5.继承

> 继承

styl

```
.msg
    padding 10px 
    margin 10px
    border 1px solid #ccc
.warning
    @extend .msg
    color red
```

css

```
.msg,
.warning {
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
}
.warning {
  color: #f00;
}
```

### 颜色函数

>颜色函数是CSS预处里器中内置的颜色函数功能，这些功能可以对颜色值进行处理，例如颜色的变亮、变暗、渐变颜色等处理十分的方便。

```
lighten(color, 10%);	 /* 返回的颜色在'color'基础上变亮10% */
darken(color, 10%); 	 /* 返回的颜色在'color'基础上变暗10% */
saturate(color, 10%); 	  /* 返回的颜色在'color'基础上饱和度增加10% */
desaturate(color, 10%); 	/* 返回的颜色在'color'基础上饱和度降低10% */  
```

styl

```
color = #0982C1
h1
  background color
  border 3px solid darken(color, 50%)  
```













