//var COIN_CONST = require('../common/const.js');
//var draw = require('../common/draw');
import * as COIN_CONST from '../common/const.js';
import draw from '../canvas/draw';

// 浮云
class Cloud {
  constructor() {
    this.x = 0;
    this.y = Math.random() * 50;
    this.y = this.y < 30 ? 30 : this.y;
    this.width = Math.random() * 30 + 20;
    this.height = this.width * 0.6;
    this.remove = false;
  }

  updateElement() {
    this.x += 0.5;
    if (this.x > COIN_CONST.CANVAS_DEFAULT_WIDTH + 10) {
      this.remove = true;
    }
  }

  render() {
    draw.cloud(this.x, this.y, this.width, this.height);
  }
}

export default Cloud;
