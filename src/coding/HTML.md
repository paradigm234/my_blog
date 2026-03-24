# HTML

## HTML基本信息

什么是HTML
Hyper Text Markup Language（超文本标记语言）

世界知名浏览器厂商均对HTML5支持

==HTML5+CSS3！==

```html
<!-- 注释这样写 -->
<!DOCTYPE html> //告诉浏览器什么标准
<html>//所有代码都要在html标签里面
    <head>//表示网页头部
        <title>my first web//表示网页标题
        </title>
    </head>
        <body>//表示网页主体
            my first web
        </body>
</html>
```

大部分标签成对出现，分别为开放标签和闭合标签

`<meta charset = "UTF-8">`
`<meta name = "keywords" content = "计算机开发，前端技术">`
`<meta name = "description" content = "这是一个学习html技术的文档">`

meta标签是描述性标签，用来描述网页信息的

## 标签学习

### 标题标签

```html
<h1>一级标签</h1>
<h2>二级标签</h2>
...一直到h6
```

### 段落标签

用来分段的标签

```html
<p>两只老虎两只老虎</p>
<p>跑得快</p>
```

### 换行标签

是一个自闭合标签，不需要成对出现

```html
两只老虎两只老虎<br/>
跑得快<br/>
```

==换行标签和段落区间不一样，换行更加紧凑，段落两行之间会有间隔==

### 水平线标签

```html
<hr/>
```

### 粗体斜体标签

```html
<strong>这是加粗的字</strong>
<em>这是斜体的字</em>
```

### 特殊符号

空格：`&nbsp;`

大于号：`&gt;`

小于号：`&lt;`

版权符号：`copy;`

...还有大量的特殊符号，记住几个常用的即可

### 图像标签

```html
<img src="" alt="" title="" width="300" height="300">
```

`src`:图片地址（绝对地址或相对地址都可，但是一般推荐绝对路径）

eg:"../A/B"

`alt`：描述

`title`：悬停文字

### 连接标签

```html
<a href="1.my first web.html"target="_blank">点击我跳转到第一个网站</a>
```

==连接标签里面可以嵌套图片，可以做图像超链接，点图像就行了==

`target`:blank在新标签打开，_self在当前页面跳转

锚链接

```html
<a name="top">顶部</a>
<a href="#top">回到顶部</a>
```

先打标签，然后跳转到上面,实现页面间跳转

### 功能性链接

#### 邮件链接

```html
<a href=mailto:2529838894@@qq.com"">点击联系我
</a>
```

### 行内元素和块元素

`块元素`：无论内容多少，该元素独占一行

eg:  p、h1-h6...

`行内元素`：内容撑开宽度，左右都是行内元素的在排在一行

eg：a、strong、em

## 列表

### 有序列表

```html
<ol>
    <li>Java</li>
    <li>python</li>
    <li>cpp</li>
    <li>运维</li>
    <li>测试</li>
</ol>
```

### 无序列表

```html
<ol>
    <li>Java</li>
    <li>python</li>
    <li>cpp</li>
    <li>运维</li>
    <li>测试</li>
</ol>
```

![image-20260307160121168](/operating_system_images/image-20260307160121168.png)

### 自定义列表

```html
<！--自定义列表
     dl：标签
     dt：列表名称
     dd：列表内容
        -->
<dl>
    <dt>学科</dt>
    
    <dd>Java</dd>
    <dd>python</dd>
    <dd>Linux</dd>
    <dt>位置</dt>
    <dd>合肥</dd>
    <dd>上海</dd>
    <dd>日本</dd>
</dl>
```

![image-20260307160812059](/operating_system_images/image-20260307160812059.png)

## 视频和音频

视频：video
音频：audio

```html
<video src="../resource/...."controls(控制播放的)autoplay></video>
```

autoplay：自动播放
controls：控制播放

```html
<audio src="../.." controlsautoplay></audio>
```

