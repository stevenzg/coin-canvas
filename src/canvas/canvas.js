import * as COIN_CONST from '../common/const';

var canvasObj = document.createElement("canvas");
var canvasContext = canvasObj.getContext('2d');

canvasObj.width = COIN_CONST.CANVAS_DEFAULT_WIDTH;
canvasObj.height = COIN_CONST.CANVAS_DEFAULT_HEIGHT;

document.body.appendChild(canvasObj);

export {canvasObj, canvasContext};
