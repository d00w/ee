const thQuadtree = require('./algorithms/quadtree');
const AabbTree = require('./algorithms/aabbtree');
const planck = require('planck')
const ctQuadTree = require('./algorithms/ctquadtree/quadtree');
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

createCtQuadTree = function (world, boxes) {
    var bound = new ctQuadTree.Rectangle(world.x,world.y,world.width,world.height)
    var tree = new ctQuadTree.QuadTree(bound)
    var objects = []
    for(var i=0;i<boxes.length;i++) {
        var p = new ctQuadTree.Point(boxes[i].x, boxes[i].y)
        tree.insert(p)
        var box = new ctQuadTree.Rectangle(boxes[i].x,boxes[i].y,boxes[i].w,boxes[i].h)
        objects.push(box)
    }
    return {tree: tree, objects: objects};

}
queryCtQuadTree = function(tree, obj) {
    var box = new ctQuadTree.Rectangle(obj.x,obj.y,obj.w,obj.h)
    return tree.query(box)
}

createThQuadTree = function (world, boxes) {
    var quadTree = new thQuadtree(world, 4);

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

queryThQuadTree = function (tree, obj) {
    var collides = []
    var all = tree.retrieve(obj);
    for (var j=0;j<all.length;j++) {
      //compare obj with all[j]
      if (obj.x < all[j].x + all[j].width &&
        obj.x + obj.width > all[j].x &&
        obj.y < all[j].y + all[j].height &&
        obj.y + obj.height > all[j].y) {
          collides.push(all[j]);
      }
    }
    return collides
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

createPlanckAabbTree = function (boxes) {
    var tree = new planck.DynamicTree()
    var objects = [];
    for(var i=0;i<boxes.length;i++) {
        var box = {
            lowerBound: {x:boxes[i].x, y:boxes[i].y},
            upperBound: {x:boxes[i].x + boxes[i].w, y: boxes[i].y + boxes[i].h}
        }
        tree.createProxy(box)
        objects.push(box)
    }
    return {tree: tree, objects: objects};
}

module.exports = {
    randMinMax,
    toMs,
    boxes,
    createThQuadTree,
    createAabbTree,
    queryThQuadTree,
    createCtQuadTree
  };