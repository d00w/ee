const Utils = require("./Utils");
var fs = require('fs')

var datafile
if(process.argv[2]) {
  var args = process.argv.slice(2,3).map(function(filepath) {
    return fs.readFileSync(filepath, 'utf-8')
  })
  datafile = args[0];
} else {
    console.log("Usage example: node run ./data/world1_boxes6.js");
    process.exit(1)
}

eval(datafile)
var boxes = data.boxes
var world = data.world

/*******************************************
 * measure quad tree
 * ****************************************/

var time = process.hrtime();

var quadTreeObj = createQuadTree(world, boxes);

time = process.hrtime(time);

console.log('create quad tree '+Utils.toMs(time) +'ms');

time = process.hrtime();

for(var i=0;i<quadTreeObj.quadObjects.length;i++) {
    quadTreeObj.quadTree.retrieve(quadTreeObj.quadObjects[i]);
}

time = process.hrtime(time);
console.log('retrieve quad tree '+Utils.toMs(time) +'ms');

/*******************************************
 * measure aabb tree
 * ****************************************/
var time = process.hrtime();

var aabbTreeObj = createAabbTree(world, boxes);

time = process.hrtime(time);

console.log('create aabb tree '+Utils.toMs(time) +'ms');

time = process.hrtime();

for(var i=0;i<aabbTreeObj.aabbObjects.length;i++) {
    aabbTreeObj.aabbTree.intersects(aabbTreeObj.aabbObjects[i]);
}

time = process.hrtime(time);
console.log('retrieve aabb tree '+Utils.toMs(time) +'ms');