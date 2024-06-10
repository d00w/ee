const Utils = require("./Utils");
var fs = require('fs')

// Getting test data
var test_data = fs.readFileSync("./data/test_data.js", 'utf-8')
eval(test_data)

var result_csv = fs.openSync('result.csv', 'w')
fs.writeSync(result_csv,'Trial,Algorithm,Data type,Number of boxes,Construction time (ms),Query time (ms)\n')

function runTrial(t) {

  /*******************************************
   * Quad Tree testing
   * ****************************************/

  for (i in data) {
    var boxes = data[i].boxes
    var world = data[i].world
    var type = data[i].type
    var count = boxes.length
    // Construction start time
    var time = process.hrtime();

    // CONSTRUCTION OF QUAD TREE
    var quadTree = constructQuadTree(world, boxes);

    // Construction end time
    time = process.hrtime(time);

    // Print result
    fs.writeSync(result_csv,t +","+"QUAD Tree," + type + ","+count+","+Utils.toMs(time))//the line is not finished yet
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
    fs.writeSync(result_csv,','+Utils.toMs(time)+'\n')
    console.log('QUAD TREE QUERY: '+Utils.toMs(time) +'ms');
  }

  /*******************************************
   * AABB Tree testing
   * ****************************************/


  for (i in data) {

    var boxes = data[i].boxes
    var world = data[i].world
    var type = data[i].type
    var count = boxes.length
    // Construction start time
    var time = process.hrtime();

    // CONSTRUCTION OF AABB TREE
    var aabbTree = constructAabbTree(boxes);

    // Construction end time
    time = process.hrtime(time);

    // Print result
    fs.writeSync(result_csv,t +","+"AABB Tree," + type + ","+count+","+Utils.toMs(time))
    console.log('AABB TREE CONSTRUCTION: '+Utils.toMs(time) +'ms');

    // Query start time
    time = process.hrtime();

    // QUERY OF AABB TREE
    for(k in aabbTree.objects) {
      aabbTree.tree.query(aabbTree.objects[k], function(nodeId) {})
    }

    // Query end time
    time = process.hrtime(time);

    // Print result
    fs.writeSync(result_csv,','+Utils.toMs(time)+'\n')
    console.log('AABB TREE QUERY: '+Utils.toMs(time) +'ms');
  }
}

for (var t = 1; t<=3;t++) {
  runTrial(t);
}
