Play: [Coin Canvas](http://gyf1.com/coin-canvas/)

# 为什么要搞点游戏
游戏可以让烧钱更有趣。
就快到双11，不知道有没有人在淘宝抢红包，好像现在都是以游戏的形式出现的。
而且做点游戏也便于推广和增加用户黏度。当然有人就直接想获取一个红包。但是可以混合使用普通模式和游戏模式。

# Canvas overview
### 即时模式
> 画布工作在即时模式，它并不保存自己的对象，只是说明在每个单个帧里绘制什么。

Canvas做的事情就是画图，而且画完了就忘了。
我们不能通过DOM访问到canvas创建的单个图形元素。

> Canvas是一个即时模式的绘图界面，这就意味着如果什么东西发生了变化就需要即时重新绘制

Canvas也没有对动画的处理，如果要有动画的效果，比如移动一个元素，那我们就需要清除整个的canvas，然后重新画一下移动过的元素。

### 加载
> window对象是DOM的最高一级，需要对这个对象进行检测来确保开始使用Canvas应用程序之前，已经加载了所有的资源和代码

代码：
```javascript
window.addEventListener('load', eventWindowLoaded, false);
```

### 浏览器支持
不是每个浏览器都会支持canvas，对不支持的浏览器该如何处理
* 在canvas的标签里输入提示文字，不支持的浏览器会显示
```html
<canvas>您的浏览器不支持canvas</canvas>
```
* 在写js代码的时候进行检测
```javascript
var theCanvas = document.getElementById('canvasOne');
if (!theCanvas || !theCanvas.getContext) {
  return;
}
```
* 创建一个虚拟画布
```javascript
function canvasSupport () {
  return !!document.createElement('canvas').getContext;
}
function canvasApp () {
  if (!canvasSupport) {
    return;
  }
}
```
* modernizr.js
```javascript
function canvasSupport () {
  return Modernizr.canvas;
}
```
### context 环境
> 在Canvas上运行的各种操作都要通过context对象，因为它引用了HTML页面上的对象

```javascript
var context = theCanvas.getContext('2d');
```
对应的JavaScript标准对象叫做：CanvasRenderingContext2D（简称 环境）
上面定义了很多方法(一个屏幕的截图都截不全，还有一些...
![canvas](https://cloud.githubusercontent.com/assets/6308804/10778529/1c7c2ec2-7d62-11e5-820f-3a49c986d9e9.jpg)






# 实现思路
### 定时器
为什么我们选择requestAnimationFrame

http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

[CSS3动画那么强，requestAnimationFrame还有毛线用？](http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-动画算法/)

> 相当一部分的浏览器的显示频率是16.7ms, 如果显示器16.7ms刷新间隔之前发生了其他绘制请求，就会出现丢帧，会有点卡。
不仅如此，这种计时器频率的降低也会对电池使用寿命造成负面影响，并会降低其他应用的性能。
这也是为何setTimeout的定时器值推荐最小使用16.7ms的原因（16.7 = 1000 / 60, 即每秒60帧）。
而我requestAnimationFrame就是为了这个而出现的。我所做的事情很简单，跟着浏览器的绘制走，如果浏览设备绘制间隔是16.7ms，那我就这个间隔绘制；
如果浏览设备绘制间隔是10ms, 我就10ms绘制。这样就不会存在过度绘制的问题，动画不会掉帧，自然流畅的说~~


而setInterval和setTimeout也是有区别的：
The difference is subtle:

> setInterval code executes every 1000ms exactly, while...
setTimeout waits 1000ms, runs the function (which takes few ms), then sets another timeout. So the wait period is actually a bit more than 1000ms.

http://stackoverflow.com/questions/729921/settimeout-or-setinterval

settimeout setinterval performance:
http://ejohn.org/blog/analyzing-timer-performance/
http://jsperf.com/setinterval-vs-settimeout

### 更新元素状态
### 绘制所有元素
### 监听事件



# To Do
总结出一个开发模版 canvas game template

# More
[How To Design A Mobile Game With HTML5](http://www.smashingmagazine.com/2012/10/design-your-own-mobile-game/)
[2D breakout game using pure JavaScript](https://developer.mozilla.org/en-US/docs/Games/Workflows/2D_Breakout_game_pure_JavaScript)
http://www.lostdecadegames.com/demos/simple_canvas_game/
[A Gentle Introduction to Making HTML5 Canvas Interactive](http://simonsarris.com/blog/510-making-html5-canvas-useful)
[Making and Moving Selectable Shapes on an HTML5 Canvas: A Simple Example](http://simonsarris.com/blog/140-canvas-moving-selectable-shapes)
[Selectable Shapes Part 2: Resizable, Movable Shapes on HTML5 Canvas](http://simonsarris.com/blog/225-canvas-selecting-resizing-shape)
https://github.com/amclark/shapesdemo
[CSS3动画那么强，requestAnimationFrame还有毛线用？](http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-动画算法/)
[Create a mobile version of Snake with HTML5 canvas and JavaScript](http://www.creativebloq.com/html5/create-mobile-version-snake-html5-canvas-and-javascript-11116657)
[How to make a simple HTML5 Canvas game](http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/)
[Simple Web Canvas Game Template](https://github.com/mozilla/WebGameStub)
[The Complete Guide to Building HTML5 Games with Canvas and SVG](http://www.sitepoint.com/the-complete-guide-to-building-html5-games-with-canvas-and-svg/)
[Creating a Simple HTML5 Canvas Animation](http://www.kirupa.com/html5/creating_simple_html5_canvas_animation.htm)
[HTML5 Canvas Particle Animation](http://timothypoon.com/blog/2011/01/19/html5-canvas-particle-animation/)
[HTML5 Canvas Grass Animation](http://cssdeck.com/labs/4ksohwya)
[有趣的 HTML5 游戏：AnyYolk](http://www.open-open.com/lib/view/open1366943744671.html)
[贝塞尔曲线与CSS3动画、SVG和canvas的基情](http://www.zhangxinxu.com/wordpress/2013/08/%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF-cubic-bezier-css3%E5%8A%A8%E7%94%BB-svg-canvas/)
http://www.html5canvastutorials.com/advanced/html5-canvas-save-drawing-as-an-image/
http://www.xyhtml5.com/html5-canvas-event-handler.html
http://codular.com/animation-with-html5-canvas
http://www.108js.com/article/article3/30152.html?id=637
http://developer.51cto.com/art/201209/357723.htm
http://www.html5tricks.com/8-html5-canvas-animation-view.html
http://stackoverflow.com/questions/4927909/is-there-a-good-method-for-dynamically-drawing-clouds-with-html5-canvas-and-java
http://silveiraneto.net/2011/06/02/simple-html5-animation-clouds-over-background/
http://www.ibm.com/developerworks/library/wa-parallaxprocessing/
http://stackoverflow.com/questions/13157586/full-screen-canvas-on-mobile-devices
https://geeksretreat.wordpress.com/2012/10/24/great-balls-of-gravity-html5-canvas/
http://codetheory.in/rendering-animations-with-moving-objects-on-canvas/
http://codetheory.in/basics-of-implementing-gravity-with-html5-canvas/

# 关键字
canvas  mobile game
canvas animation
canvas click on moving
canvas click moving image
canvas falling ball
html5 canvas tree
html5 canvas 树
html5 canvas grass
canvas cloud
html5 canvas cloud
canvas cloud annimation
canvas  presentation
Full screen canvas on mobile-devices
requestanimationframe 用法
