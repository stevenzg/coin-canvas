/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//module COIN_CONST from '../coin_canvas_es6/common/const.js';
	//import {CANVAS_DEFAULT_WIDTH, CANVAS_DEFAULT_HEIGHT} from '../coin_canvas_es6/common/const.js';

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _elementsRmb = __webpack_require__(1);

	var _elementsRmb2 = _interopRequireDefault(_elementsRmb);

	var _elementsCloud = __webpack_require__(5);

	var _elementsCloud2 = _interopRequireDefault(_elementsCloud);

	var _elementsParticle = __webpack_require__(6);

	var _elementsParticle2 = _interopRequireDefault(_elementsParticle);

	var _elementsTouch = __webpack_require__(7);

	var _elementsTouch2 = _interopRequireDefault(_elementsTouch);

	var COIN_CONST = __webpack_require__(2);
	var requestAnimFrameFunction = __webpack_require__(8);
	var draw = __webpack_require__(3);
	var score = __webpack_require__(4);
	var util = __webpack_require__(9);

	var grassImage = new Image();
	grassImage.src = './img/grass.png';

	var Coin = {

	  // 根据屏幕的大小resize后的缩放比例
	  scale: 1,

	  // canvas相对于屏幕的位置
	  offset: {
	    top: 0,
	    left: 0
	  },

	  // 存储所有的金币，点击效果，金币碎片
	  elements: [],

	  // 游戏计时器，隔多久出来新的硬币
	  tick: 100,

	  // 长宽比例
	  RATIO: null,

	  // resize后的canvas的宽度和高度
	  currentWidth: null,
	  currentHeight: null,

	  // canvas对象
	  canvas: null,

	  // canvas context
	  context: null,

	  init: function init() {
	    Coin.RATIO = COIN_CONST.CANVAS_DEFAULT_WIDTH / COIN_CONST.CANVAS_DEFAULT_HEIGHT;

	    Coin.currentWidth = COIN_CONST.CANVAS_DEFAULT_WIDTH;
	    Coin.currentHeight = COIN_CONST.CANVAS_DEFAULT_HEIGHT;

	    Coin.canvas = document.createElement("canvas");
	    window.canvasContext = Coin.canvas.getContext('2d');
	    Coin.canvas.width = COIN_CONST.CANVAS_DEFAULT_WIDTH;
	    Coin.canvas.height = COIN_CONST.CANVAS_DEFAULT_HEIGHT;
	    document.body.appendChild(Coin.canvas);

	    window.addEventListener('click', function (e) {
	      console.log('click');
	      e.preventDefault();
	      Coin.Event.add(e);
	    }, false);

	    window.addEventListener('touchstart', function (e) {
	      console.log('touchstart');
	      e.preventDefault();
	      Coin.Event.add(e.touches[0]);
	    }, false);

	    window.addEventListener('touchmove', function (e) {
	      console.log('touchmove');
	      e.preventDefault();
	    }, false);

	    window.addEventListener('touchend', function (e) {
	      console.log('touchend');
	      e.preventDefault();
	    }, false);

	    Coin.resizeCanvas();
	    Coin.falling();
	  },

	  resizeCanvas: function resizeCanvas() {
	    // 将canvas的高度设置成窗口的高度
	    Coin.currentHeight = window.innerHeight;
	    // 按照长宽比例缩放宽度
	    Coin.currentWidth = Coin.currentHeight * Coin.RATIO;

	    Coin.canvas.style.height = Coin.currentHeight + 'px';
	    Coin.canvas.style.width = Coin.currentWidth + 'px';

	    Coin.scale = Coin.currentWidth / COIN_CONST.CANVAS_DEFAULT_WIDTH;
	    Coin.offset.top = Coin.canvas.offsetTop;
	    Coin.offset.left = Coin.canvas.offsetLeft;
	  },

	  repaintCanvas: function repaintCanvas() {
	    var i,
	        isCollision = false;

	    Coin.tick -= 1;

	    if (Coin.tick < 0) {
	      Coin.elements.push(new _elementsCloud2['default']());
	      Coin.elements.push(new _elementsRmb2['default']());
	      Coin.tick = Math.random() * 100 + 100;
	    }

	    if (Coin.Event.tabbed) {
	      score.taps += 1;
	      Coin.elements.push(new _elementsTouch2['default'](Coin.Event.x, Coin.Event.y));
	      Coin.Event.tabbed = false;
	      isCollision = true;
	    }

	    for (i = 0; i < Coin.elements.length; ++i) {
	      Coin.elements[i].updateElement();

	      if (Coin.elements[i].type === 'rmb' && isCollision) {
	        var hit = util.collide(Coin.elements[i], { x: Coin.Event.x, y: Coin.Event.y, radius: 7 });
	        // 当击中后，显示一些碎片
	        if (hit) {
	          for (var n = 0; n < 5; ++n) {
	            Coin.elements.push(new _elementsParticle2['default'](Coin.elements[i].x, Coin.elements[i].y));
	          }
	          score.hit += 1;
	        }
	        Coin.elements[i].remove = hit;
	      }

	      if (Coin.elements[i].remove) {
	        Coin.elements.splice(i, 1);
	      }
	    }
	  },

	  render: function render() {
	    // 整个canvas的颜色
	    draw(canvasContext).rect(0, 0, COIN_CONST.CANVAS_DEFAULT_WIDTH, COIN_CONST.CANVAS_DEFAULT_HEIGHT, '#1e89e0');
	    // 草地
	    draw(canvasContext).image(grassImage, 0, COIN_CONST.CANVAS_DEFAULT_HEIGHT - 50, Coin.currentWidth, 50);

	    for (var i = 0, len = Coin.elements.length; i < len; ++i) {
	      Coin.elements[i].render();
	    }
	    draw(canvasContext).text('红包: ' + score.hit / 10 + ' 元', 20, 30, 14, '#fff');
	    draw(canvasContext).text('丢失: ' + score.escaped / 10 + ' 元', 20, 50, 14, '#fff');
	  },

	  falling: function falling() {
	    requestAnimFrameFunction(Coin.falling);
	    Coin.repaintCanvas();
	    Coin.render();
	  }
	};

	// 事件
	Coin.Event = {
	  x: 0,
	  y: 0,
	  tabbed: false,
	  add: function add(event) {
	    // MouseEvent.pageX
	    Coin.Event.x = (event.pageX - Coin.offset.left) / Coin.scale;

	    // MouseEvent.pageY
	    Coin.Event.y = (event.pageY - Coin.offset.top) / Coin.scale;
	    Coin.Event.tabbed = true;
	  }
	};

	window.addEventListener('load', Coin.init, false);
	window.addEventListener('resize', Coin.resizeCanvas, false);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	//import {CANVAS_DEFAULT_WIDTH, CANVAS_DEFAULT_HEIGHT} from '../coin_canvas_es6/common/const.js';
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var COIN_CONST = __webpack_require__(2);
	var draw = __webpack_require__(3);
	var score = __webpack_require__(4);

	var coinImage = new Image();
	coinImage.src = './img/ele.png';

	// 生成金币

	var RMB = (function () {
	  function RMB() {
	    _classCallCheck(this, RMB);

	    this.type = 'rmb';
	    // 半径大小
	    this.radius = Math.random() * 20 + 10;
	    // 下降的速度
	    this.speed = Math.random() * 3 + 1;
	    // 水平方向的位置
	    this.x = Math.random() * COIN_CONST.CANVAS_DEFAULT_WIDTH - this.radius * 2;
	    if (this.x < this.radius) {
	      this.x = this.radius;
	    }
	    this.y = 0;
	    this.remove = false;
	  }

	  _createClass(RMB, [{
	    key: 'updateElement',
	    value: function updateElement() {
	      this.y += this.speed;
	      if (this.y > COIN_CONST.CANVAS_DEFAULT_HEIGHT + 10) {
	        score.escaped += 1;
	        this.remove = true;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      draw(canvasContext).image(coinImage, this.x, this.y, this.radius * 2, this.radius * 2);
	    }
	  }]);

	  return RMB;
	})();

	exports['default'] = RMB;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	// canvas的实际宽度和高度
	//export const CANVAS_DEFAULT_WIDTH = 320;
	//export const CANVAS_DEFAULT_HEIGHT = 480;

	//export function a() {
	//
	//}

	//const CANVAS_DEFAULT_WIDTH = 320;
	//const CANVAS_DEFAULT_HEIGHT = 480;
	//
	//module.exports = CANVAS_DEFAULT_WIDTH;
	//module.exports = CANVAS_DEFAULT_HEIGHT;

	// canvas的实际宽度和高度
	"use strict";

	var CANVAS_CONST = {
	  CANVAS_DEFAULT_WIDTH: 320,
	  CANVAS_DEFAULT_HEIGHT: 480
	};

	module.exports = CANVAS_CONST;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var draw = function draw(context) {

	  return {
	    clear: function clear() {
	      context.clearRect(0, 0, Coin.WIDTH, Coin.HEIGHT);
	    },

	    rect: function rect(x, y, w, h, color) {
	      context.fillStyle = color;
	      context.fillRect(x, y, w, h);
	    },

	    circle: function circle(x, y, r, color) {
	      context.fillStyle = color;
	      context.beginPath();
	      context.arc(x, y + 5, r, 0, Math.PI * 2, true);
	      context.closePath();
	      context.fill();
	    },

	    text: function text(string, x, y, size, color) {
	      context.font = 'bold ' + size + 'px Monospace';
	      context.fillStyle = color;
	      context.fillText(string, x, y);
	    },

	    image: function image(img, dx, dy, width, height) {
	      context.drawImage(img, dx, dy, width, height);
	    },

	    cloud: function cloud(cx, cy, cw, ch) {
	      context.beginPath();
	      //创建渐变
	      var grd = context.createLinearGradient(0, 0, 0, cy);
	      grd.addColorStop(0, 'rgba(255,255,255,0.8)');
	      grd.addColorStop(1, 'rgba(255,255,255,0.5)');
	      context.fillStyle = grd;
	      context.fill();
	      //在不同位置创建5个圆拼接成云朵现状
	      context.arc(cx, cy, cw * 0.19, 0, 360, false);
	      context.arc(cx + cw * 0.08, cy - ch * 0.3, cw * 0.11, 0, 360, false);
	      context.arc(cx + cw * 0.3, cy - ch * 0.25, cw * 0.25, 0, 360, false);
	      context.arc(cx + cw * 0.6, cy, cw * 0.21, 0, 360, false);
	      context.arc(cx + cw * 0.3, cy - ch * 0.1, cw * 0.28, 0, 360, false);
	      context.closePath();
	      context.fill();
	    }
	  };
	};

	module.exports = draw;

/***/ },
/* 4 */
/***/ function(module, exports) {

	// 用户的得分情况
	"use strict";

	var score = {
	  tabs: 0,
	  hit: 0,
	  escaped: 0,
	  accuracy: 0
	};

	module.exports = score;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var COIN_CONST = __webpack_require__(2);
	var draw = __webpack_require__(3);

	// 云朵

	var Cloud = (function () {
	  function Cloud() {
	    _classCallCheck(this, Cloud);

	    this.x = 0;
	    this.y = Math.random() * 50;
	    this.y = this.y < 30 ? 30 : this.y;
	    this.width = Math.random() * 30 + 20;
	    this.height = this.width * 0.6;
	    this.remove = false;
	  }

	  _createClass(Cloud, [{
	    key: 'updateElement',
	    value: function updateElement() {
	      this.x += 0.5;
	      if (this.x > COIN_CONST.CANVAS_DEFAULT_WIDTH + 10) {
	        this.remove = true;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      draw(canvasContext).cloud(this.x, this.y, this.width, this.height);
	    }
	  }]);

	  return Cloud;
	})();

	exports['default'] = Cloud;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var COIN_CONST = __webpack_require__(2);
	var draw = __webpack_require__(3);

	// 点击后的碎片效果

	var Particle = (function () {
	  function Particle(x, y) {
	    _classCallCheck(this, Particle);

	    this.x = x;
	    this.y = y;
	    this.radius = 2;
	    this.color = 'rgba(255,255,255,' + Math.random() * 1 + ')';
	    // 碎片的方向，向左或者向右，1向右，-1向左
	    this.direction = Math.random() * 2 > 1 ? 1 : -1;
	    // x,y方向的变化速度
	    this.xSpeed = ~ ~(Math.random() * 4) * this.direction;
	    this.ySpeed = ~ ~(Math.random() * 7);
	    this.remove = false;
	  }

	  _createClass(Particle, [{
	    key: 'updateElement',
	    value: function updateElement() {
	      // 更新碎片的位置
	      this.x += this.xSpeed;
	      this.y += this.ySpeed;
	      // 改变速速，减速
	      this.xSpeed *= 0.99;
	      this.ySpeed *= 0.99;
	      // 避免y方向速度太慢
	      this.ySpeed += 0.25;
	      // 超出屏幕后，移除
	      if (this.y > COIN_CONST.CANVAS_DEFAULT_HEIGHT + 10) {
	        this.remove = true;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      draw(canvasContext).circle(this.x, this.y, this.radius, this.color);
	    }
	  }]);

	  return Particle;
	})();

	exports['default'] = Particle;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var draw = __webpack_require__(3);

	// 点击后显示一个点击的效果

	var Touch = (function () {
	  function Touch(x, y) {
	    _classCallCheck(this, Touch);

	    this.type = 'touch';
	    this.x = x;
	    this.y = y;
	    this.radius = 5;
	    this.opacity = 1;
	    this.fade = 0.05;
	  }

	  _createClass(Touch, [{
	    key: 'updateElement',
	    value: function updateElement() {
	      this.opacity -= this.fade;
	      this.remove = this.opacity < 0 ? true : false;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      draw(canvasContext).circle(this.x, this.y, this.radius, 'rgba(255,0,0,' + this.opacity + ')');
	    }
	  }]);

	  return Touch;
	})();

	exports['default'] = Touch;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	var requestAnimFrame = (function () {
	  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	    window.setTimeout(callback, 1000 / 60);
	  };
	})();

	module.exports = requestAnimFrame;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	var util = {
	  // 检查有没有产生碰撞
	  collide: function collide(a, b) {
	    var distance_squared = (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);

	    var radii_squared = (a.radius + b.radius) * (a.radius + b.radius);

	    if (distance_squared < radii_squared) {
	      return true;
	    } else {
	      return false;
	    }
	  }
	};

	module.exports = util;

/***/ }
/******/ ]);