const Quadtree = require('./algorithms/quadtree');
const AabbTree = require("./algorithms/aabbtree");
const fs = require('fs')

/**
 * return a random number within given boundaries.
 *
 * @param {number} min		the lowest possible number
 * @param {number} max		the highest possible number
 * @param {boolean} round	if true, return integer
 * @return {number} 		a random number
 */

randMinMax = function(min, max, round) {
    var val = min + (Math.random() * (max - min));
    
    if(round) val = Math.round(val);
    
    return val;
};

toMs = function (time) {
    return (time[0] * 1000 + time[1] / 1000000);
}

boxes = function (world, sizeMin, sizeMax, count) {
    var ret = [];
    for(var i=0;i<count;i++) {
        ret.push({
            x : randMinMax(world.x, world.x+world.width-sizeMax),
            y : randMinMax(world.y, world.y+world.height-sizeMax),
            w : randMinMax(sizeMin, sizeMax, true),
            h : randMinMax(sizeMin, sizeMax, true),
        });
    };
    return ret;
}

saveBoxesInJson = function (fileName, objects) {
    fs.writeFile(fileName, objects, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

createQuadTree = function (world, boxes) {
    var quadTree = new Quadtree(world, 4);

    var quadObjects = [];

    for(var i=0;i<boxes.length;i++) {
        rect = {
            x : boxes[i].x,
            y : boxes[i].y,
            width : boxes[i].w,
            height : boxes[i].h,
            check : false
        };
        quadObjects.push(rect);
        quadTree.insert(rect);
    }
    return {quadTree: quadTree, quadObjects: quadObjects};
}

createAabbTree = function (world, boxes) {
    var aabbTree = new AabbTree.AABBTreeNode(
        new AabbTree.AxisAlignedBox(
                //Start tree at position 0,0: (Tree will be 2 dimensional because box is 2 dimensional)
                [world.x,world.y],
                //Tree Size will be 1 in each dimension:
                [world.width,world.height]
        ));

    var aabbObjects = [];

    for(var i=0;i<boxes.length;i++) {
        rect = new AabbTree.AxisAlignedBox(
            //point of origin for object
            [boxes[i].x, boxes[i].y],
            //object size
            [boxes[i].w, boxes[i].h]
        )
        aabbTree.add(i+1, rect);
        aabbObjects.push(rect);
    }

    return {aabbTree: aabbTree, aabbObjects: aabbObjects};
}


module.exports = {
    randMinMax,
    toMs,
    boxes,
    createQuadTree,
    createAabbTree,
  };