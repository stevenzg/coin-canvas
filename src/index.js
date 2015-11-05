import * as COIN_CONST from './common/const.js';
import * as Canvas from './canvas/canvas.js';
import requestAnimFrameFunction from './common/timer';
import draw from './canvas/draw';
import score from './common/score';
import util from './common/util';
import RMB from './elements/rmb';
import Cloud from './elements/cloud';
import Particle from './elements/particle';
import Touch from './elements/touch';

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

  init: () => {
    Coin.RATIO = COIN_CONST.CANVAS_DEFAULT_WIDTH / COIN_CONST.CANVAS_DEFAULT_HEIGHT;

    Coin.currentWidth = COIN_CONST.CANVAS_DEFAULT_WIDTH;
    Coin.currentHeight = COIN_CONST.CANVAS_DEFAULT_HEIGHT;

    Coin.canvas = Canvas.canvasObj;

    window.addEventListener('click', (e) => {
      e.preventDefault();
      Coin.Event.add(e);
    }, false);

    window.addEventListener('touchstart', (e) => {
      e.preventDefault();
      Coin.Event.add(e.touches[0]);
    }, false);

    Coin.resizeCanvas();
    Coin.falling();
  },

  resizeCanvas: () => {
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

  repaintCanvas: () => {
    let i, isCollision = false;

    Coin.tick -= 1;

    if (Coin.tick < 0) {
      Coin.elements.push(new Cloud());
      Coin.elements.push(new RMB());
      Coin.tick = ( Math.random() * 100 ) + 100;
    }

    if (Coin.Event.tabbed) {
      score.taps += 1;
      Coin.elements.push(new Touch(Coin.Event.x, Coin.Event.y));
      Coin.Event.tabbed = false;
      isCollision = true;
    }

    for (i = 0; i < Coin.elements.length; ++i) {
      Coin.elements[i].updateElement();

      if (Coin.elements[i].type === 'rmb' && isCollision) {
        let hit = util.collide(Coin.elements[i], {x: Coin.Event.x, y: Coin.Event.y, radius: 5});
        // 当击中后，显示一些碎片
        if (hit) {
          for (let n = 0; n < 5; ++n) {
            Coin.elements.push(new Particle(Coin.elements[i].x, Coin.elements[i].y));
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

  render: () => {
    draw.clear();
    // 整个canvas的颜色
    draw.rect(0, 0, COIN_CONST.CANVAS_DEFAULT_WIDTH, COIN_CONST.CANVAS_DEFAULT_HEIGHT, '#1e89e0');
    // 草地
    draw.image(grassImage, 0, COIN_CONST.CANVAS_DEFAULT_HEIGHT - 50, Coin.currentWidth, 50);

    for (let i = 0, len = Coin.elements.length; i < len; ++i) {
      Coin.elements[i].render();
    }
    draw.text('饿币: ' + score.hit / 10 + ' 元', 20, 30, 14, '#fff');
    draw.text('丢失: ' + score.escaped / 10 + ' 元', 20, 50, 14, '#fff');
  },

  falling: () => {
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
  add: (event) => {
    // MouseEvent.pageX
    Coin.Event.x = (event.pageX - Coin.offset.left) / Coin.scale;
    // MouseEvent.pageY
    Coin.Event.y = (event.pageY - Coin.offset.top) / Coin.scale;
    Coin.Event.tabbed = true;
  }
};

window.addEventListener('load', Coin.init, false);
window.addEventListener('resize', Coin.resizeCanvas, false);


//module COIN_CONST from '../coin_canvas_es6/common/const.js';
//import {CANVAS_DEFAULT_WIDTH, CANVAS_DEFAULT_HEIGHT} from './common/const.js';
//var COIN_CONST = require('./common/const');
//var requestAnimFrameFunction = require('./common/timer');
//var draw = require('./common/draw');
//var score = require('./common/score');
//var util = require('./common/util');
