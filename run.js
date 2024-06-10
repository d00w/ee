const Utils = require("./Utils");
var fs = require('fs')

// Getting test data
var test_data = fs.readFileSync("./data/test_data.js", 'utf-8')
eval(test_data)


/*******************************************
 * Quad Tree testing
 * ****************************************/

// Uniform 
console.log("UNIFORM")
for (var i = 0; i < 3; i++) {
  console.log("SET NUMBER: "+(i+1))
  for (var j = 0; j < 10; j++) {
    console.log("TEST NUMBER: "+(j+1))
    var boxes = (data.uniform[i][j]).boxes
    var world = (data.uniform[i][j]).world
  
    // Construction start time
    var time = process.hrtime();
  
    // CONSTRUCTION OF QUAD TREE
    var quadTree = constructQuadTree(world, boxes);
  
    // Construction end time
    time = process.hrtime(time);
  
    // Print result
    console.log('QUAD TREE CONSTRUCTION: '+Utils.toMs(time) +'ms');
  
    // Query start time
    time = process.hrtime();
  
    // QUERY OF QUAD TREE
    for (var k = 0; k < quadTree.objects.length; k++) {
        queryQuadTree(quadTree.tree, quadTree.objects[k])
    }
  
    // Query end time
    time = process.hrtime(time);
  
    // Print result
    console.log('QUAD TREE QUERY: '+Utils.toMs(time) +'ms');
  }
}




/*******************************************
 * AABB Tree testing
 * ****************************************/
// var time = process.hrtime();

// var planck = createPlanckAabbTree(boxes)

// time = process.hrtime(time);

// console.log('AABB 1: '+Utils.toMs(time) +'ms');
// time = process.hrtime();

// for(var i=0;i<planck.objects.length;i++) {
//   planck.tree.query(planck.objects[i], function(nodeId) {})
// }
// time = process.hrtime(time);
// console.log('AABB 1: '+Utils.toMs(time) +'ms');