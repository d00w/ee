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

console.log('QUAD 1: '+Utils.toMs(time) +'ms');

time = process.hrtime();

for(var i=0;i<quadTreeObj.quadObjects.length;i++) {
    var all = quadTreeObj.quadTree.retrieve(quadTreeObj.quadObjects[i]);
    queryQuadTree(quadTreeObj.quadTree, quadTreeObj.quadObjects[i])
}

time = process.hrtime(time);
console.log('QUAD 2: '+Utils.toMs(time) +'ms');

/*******************************************
 * measure planck aabb tree
 * ****************************************/
var time = process.hrtime();

var planck = createPlanckAabbTree(boxes)

time = process.hrtime(time);

console.log('AABB 1: '+Utils.toMs(time) +'ms');
time = process.hrtime();

for(var i=0;i<planck.objects.length;i++) {
  planck.tree.query(planck.objects[i], function(nodeId) {})
}
time = process.hrtime(time);
console.log('AABB 2: '+Utils.toMs(time) +'ms');

/*******************************************
 * measure aabb tree
 * ****************************************/

/*
var time = process.hrtime();

var aabbTreeObj = createAabbTree(world, boxes);

time = process.hrtime(time);

console.log('AABB 1: '+Utils.toMs(time) +'ms');

time = process.hrtime();

for(var i=0;i<aabbTreeObj.aabbObjects.length;i++) {
    aabbTreeObj.aabbTree.intersects(aabbTreeObj.aabbObjects[i]);
}

time = process.hrtime(time);
console.log('AABB 2: '+Utils.toMs(time) +'ms');
*/


/* single test

planck.tree.query({
  lowerBound: {x:100, y:100},
  upperBound: {x:200, y:200}
  }, function(nodeId) {console.log(planck.tree.getFatAABB(nodeId))})

console.log(queryQuadTree(quadTreeObj.quadTree,{
    x : 100,
    y : 100,
    width : 100,
    height : 100,
    check : false
  }))
*/