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

var test_data = []
// UNIFORM DISTRIBUTION
// 100 to 1,000
for (var i = 1; i < 21; i++) {
    var aabbs = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, i * 50)
    test_data.push({type:"uniform", boxes: aabbs, world: world});
}

// 1,000 to 10,000
for (var i = 3; i < 21; i++) {
    var aabbs = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, i * 500)
    test_data.push({type:"uniform", boxes: aabbs, world: world});
}
// 10,000 to 100,000
for (var i = 3; i < 21; i++) {
    var aabbs = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, i * 5000)
    test_data.push({type:"uniform", boxes: aabbs, world: world});
}

// CONCENTRATED DISTRIBUTION
for (var i = 1; i < 21; i++) {
    var p1 = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, i * 50 / 2)
    var p2 = Utils.generateAABBs(cWorld, SIZE_MIN, SIZE_MAX, i * 50 / 2)
    test_data.push({type:"concerntrated", boxes: p1.concat(p2), world: world});
}

for (var i = 3; i < 21; i++) {
    var p1 = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, i * 500 / 2)
    var p2 = Utils.generateAABBs(cWorld, SIZE_MIN, SIZE_MAX, i * 500 / 2)
    test_data.push({type:"concerntrated", boxes: p1.concat(p2), world: world});
}

for (var i = 3; i < 20; i++) {
    var p1 = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, i * 5000 / 2)
    var p2 = Utils.generateAABBs(cWorld, SIZE_MIN, SIZE_MAX, i * 5000 / 2)
    test_data.push({type:"concerntrated", boxes: p1.concat(p2), world: world});
}

fs.writeFile("./test_data.js", "var data="+JSON.stringify(test_data), function(err) {
    if (err) {console.log(err);}
});
