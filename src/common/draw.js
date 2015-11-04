var draw = function(context) {

  return {
    clear: () => {
      context.clearRect(0, 0, Coin.WIDTH, Coin.HEIGHT);
    },

    rect: (x, y, w, h, color) => {
      context.fillStyle = color;
      context.fillRect(x, y, w, h);
    },

    circle: (x, y, r, color) => {
      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y + 5, r, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
    },

    text: (string, x, y, size, color) => {
      context.font = 'bold ' + size + 'px Monospace';
      context.fillStyle = color;
      context.fillText(string, x, y);
    },

    image: (img, dx, dy, width, height) => {
      context.drawImage(img, dx, dy, width, height);
    },

    cloud: (cx, cy, cw, ch) => {
      context.beginPath();
      //创建渐变
      var grd = context.createLinearGradient(0, 0, 0, cy);
      grd.addColorStop(0, 'rgba(255,255,255,0.8)');
      grd.addColorStop(1, 'rgba(255,255,255,0.5)');
      context.fillStyle = grd;
      context.fill();
      //在不同位置创建5个圆拼接成云朵现状
      context.arc(
        cx,
        cy,
        cw * 0.19,
        0,
        360,
        false
      );
      context.arc(
        cx + cw * 0.08,
        cy - ch * 0.3,
        cw * 0.11,
        0,
        360,
        false
      );
      context.arc(
        cx + cw * 0.3,
        cy - ch * 0.25,
        cw * 0.25,
        0,
        360,
        false
      );
      context.arc(
        cx + cw * 0.6,
        cy,
        cw * 0.21,
        0,
        360,
        false
      );
      context.arc(
        cx + cw * 0.3,
        cy - ch * 0.1,
        cw * 0.28,
        0,
        360,
        false
      );
      context.closePath();
      context.fill();
    }
  }
};

module.exports = draw;
