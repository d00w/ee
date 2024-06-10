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

// UNIFORM DISTRIBUTION
// 100 to 1,000
var u1 = []
for (var i = 0; i < 10; i++) {
    u1.push({boxes: Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, (i+1) * 100), world: world});
}
// 1,000 to 10,000
var u2 = []
for (var i = 0; i < 10; i++) {
    u2.push({boxes: Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, (i+1) * 1000), world: world});
}
// 10,000 to 100,000
var u3 = []
for (var i = 0; i < 10; i++) {
    u3.push({boxes: Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, (i+1) * 10000), world: world});
}

// CONCENTRATED DISTRIBUTION
var c1 = []
for (var i = 0; i < 10; i++) {
    var p1 = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, (i+1) * 100 / 2)
    var p2 = Utils.generateAABBs(cWorld, SIZE_MIN, SIZE_MAX, (i+1) * 100 / 2)
    c1.push({boxes: p1.concat(p2), world: world});
}

var c2 = []
for (var i = 0; i < 10; i++) {
    var p1 = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, (i+1) * 1000 / 2)
    var p2 = Utils.generateAABBs(cWorld, SIZE_MIN, SIZE_MAX, (i+1) * 1000 / 2)
    c2.push({boxes: p1.concat(p2), world: world});
}

var c3 = []
for (var i = 0; i < 10; i++) {
    var p1 = Utils.generateAABBs(world, SIZE_MIN, SIZE_MAX, (i+1) * 10000 / 2)
    var p2 = Utils.generateAABBs(cWorld, SIZE_MIN, SIZE_MAX, (i+1) * 10000 / 2)
    c3.push({boxes: p1.concat(p2), world: world});
}

var test_data = {
    uniform: [u1, u2, u3],
    concentrated: [c1, c2, c3]
}

fs.writeFile("./test_data.js", "var data="+JSON.stringify(test_data), function(err) {
    if (err) {console.log(err);}
});
