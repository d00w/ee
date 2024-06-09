const Utils = require("../Utils");

var XMIN = 1;
var YMIN = 1;
var WIDTH = 1000;
var HEIGHT = 600;
var SIZE_MIN = 10;
var SIZE_MAX = 10;

var world1 = {
    x: XMIN,
    y: YMIN,
    width: WIDTH,
    height: HEIGHT
}
var w1b1 = {boxes: Utils.boxes(world1, SIZE_MIN, SIZE_MAX, 200), world: world1};
var w1b2 = {boxes: Utils.boxes(world1, SIZE_MIN, SIZE_MAX, 400), world: world1};
var w1b3 = {boxes: Utils.boxes(world1, SIZE_MIN, SIZE_MAX, 600), world: world1};
var w1b4 = {boxes: Utils.boxes(world1, SIZE_MIN, SIZE_MAX, 800), world: world1};
var w1b5 = {boxes: Utils.boxes(world1, SIZE_MIN, SIZE_MAX, 1000), world: world1};

var concentratedBoxes = Utils.boxes(world1, SIZE_MIN, SIZE_MAX, 600).concat(Utils.boxes({x:300,y:200,width:200,height:100}, SIZE_MIN, SIZE_MAX, 400));
var w1b6 = {boxes: concentratedBoxes, world:world1};

saveBoxesInJson("./world1_boxes1.js", "var data="+JSON.stringify(w1b1));
saveBoxesInJson("./world1_boxes2.js", "var data="+JSON.stringify(w1b2));
saveBoxesInJson("./world1_boxes3.js", "var data="+JSON.stringify(w1b3));
saveBoxesInJson("./world1_boxes4.js", "var data="+JSON.stringify(w1b4));
saveBoxesInJson("./world1_boxes5.js", "var data="+JSON.stringify(w1b5));
saveBoxesInJson("./world1_boxes6.js", "var data="+JSON.stringify(w1b6));
