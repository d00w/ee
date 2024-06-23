const Utils = require("./Utils");
var fs = require('fs')

// Getting test data
var test_data = fs.readFileSync("./data/test_data.js", 'utf-8')
eval(test_data)

var result_csv = fs.openSync('result.csv', 'w')
fs.writeSync(result_csv,'Trial,Algorithm,Data type,Number of boxes,Construction time (ms),Query time (ms)\n')

// Run experiment trail
function runTrial(t) {

  /*******************************************
   * Quad Tree testing
   * ****************************************/
  for (i in data) {
    var boxes = data[i].boxes
    var world = data[i].world
    var type = data[i].type
    var count = boxes.length

    // CONSTRUCTION OF QUAD TREE
    var time = process.hrtime();
    var quadTree = constructQuadTree(world, boxes);
    time = process.hrtime(time);

    // Save result
    fs.writeSync(result_csv,t +","+"QUAD Tree," + type + ","+count+","+Utils.toMs(time))

    // QUERY OF QUAD TREE
    time = process.hrtime();
    for (var k = 0; k < quadTree.objects.length; k++) {
        queryQuadTree(quadTree.tree, quadTree.objects[k])
    }
    time = process.hrtime(time);

    // Save result
    fs.writeSync(result_csv,','+Utils.toMs(time)+'\n')
  }

  /*******************************************
   * AABB Tree testing
   * ****************************************/
  for (i in data) {
    var boxes = data[i].boxes
    var world = data[i].world
    var type = data[i].type
    var count = boxes.length

    // CONSTRUCTION OF AABB TREE
    var time = process.hrtime();
    var aabbTree = constructAabbTree(boxes);
    time = process.hrtime(time);

    // Save result
    fs.writeSync(result_csv,t +","+"AABB Tree," + type + ","+count+","+Utils.toMs(time))

    // QUERY OF AABB TREE
    time = process.hrtime();
    for(k in aabbTree.objects) {
      aabbTree.tree.query(aabbTree.objects[k], function(nodeId) {})
    }
    time = process.hrtime(time);

    // Save result
    fs.writeSync(result_csv,','+Utils.toMs(time)+'\n')
  }
}

// Loop for all trails
for (var t = 1; t<=3;t++) {
  runTrial(t);
}
