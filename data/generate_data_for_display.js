const Utils = require("../Utils");
const fs =  require('fs');

// Experiment properties
var XMIN = 1;
var YMIN = 1;
var WORLD_WIDTH = 1000;
var WORLD_HEIGHT = 1000;
var SIZE_MIN = 10;
var SIZE_MAX = 10;


// Create world
var world = {
    x: XMIN,
    y: YMIN,
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT
}

var cWorld = {
    x: XMIN + WORLD_WIDTH/3,
    y: YMIN + WORLD_HEIGHT/3,
    width: WORLD_WIDTH/3,
    height: WORLD_HEIGHT/3
}

var aabbs1 = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, 1000);
fs.writeFile("./1k_uniform_data.js", "var data="+JSON.stringify({boxes: aabbs1, world: world}), function(err) {
    if (err) {console.log(err);}
});
var aabbs2 = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, 10000);
fs.writeFile("./10k_uniform_data.js", "var data="+JSON.stringify({boxes: aabbs2, world: world}), function(err) {
    if (err) {console.log(err);}
});
var aabbs3 = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, 500);
var aabbs4 = Utils.generateAABBs(cWorld, SIZE_MIN, SIZE_MAX, 500);
fs.writeFile("./1k_concen_data.js", "var data="+JSON.stringify({boxes: aabbs3.concat(aabbs4), world: world}), function(err) {
    if (err) {console.log(err);}
});
var aabbs5 = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, 5000);
var aabbs6 = Utils.generateAABBs(cWorld, SIZE_MIN, SIZE_MAX, 5000);
fs.writeFile("./10k_concen_data.js", "var data="+JSON.stringify({boxes: aabbs5.concat(aabbs6), world: world}), function(err) {
    if (err) {console.log(err);}
});
var aabbs7 = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, 5000);
fs.writeFile("./5k_uniform_data.js", "var data="+JSON.stringify({boxes: aabbs7, world: world}), function(err) {
    if (err) {console.log(err);}
});
var aabbs8 = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, 2500);
var aabbs9 = Utils.generateAABBs(cWorld, SIZE_MIN, SIZE_MAX, 2500);
fs.writeFile("./5k_concen_data.js", "var data="+JSON.stringify({boxes: aabbs8.concat(aabbs9), world: world}), function(err) {
    if (err) {console.log(err);}
});
