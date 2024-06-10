const QuadTree = require('./algorithms/quadtree');
const planck = require('planck')
const fs = require('fs')

// Random number generator
randMinMax = function(min, max) {
    var val = min + (Math.random() * (max - min));
    return val;
};

// Nanosecond to millisecond converter
toMs = function (time) {
    return (time[0] * 1000 + time[1] / 1000000);
}

// Generate AABBs
// x, y = coordinates of top left vertex
// w, h = width and height
generateAABBs = function (world, sizeMin, sizeMax, count) {
    var ret = [];
    for(var i=0;i<count;i++) {
        ret.push({
            x : randMinMax(world.x, world.x+world.width-sizeMax),
            y : randMinMax(world.y, world.y+world.height-sizeMax),
            w : randMinMax(sizeMin, sizeMax),
            h : randMinMax(sizeMin, sizeMax),
        });
    };
    return ret;
}

// Constructing the Quad tree
constructQuadTree = function (world, boxes) {
    var quadTree = new QuadTree(world, 4);

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

    return {tree: quadTree, objects: quadObjects};
}

// Querying the Quad tree
queryQuadTree = function (tree, obj) {
    var collisions = []

    var all = tree.retrieve(obj);

    for (var j=0;j<all.length;j++) {
      //compare obj with all[j]
      if (obj.x < all[j].x + all[j].width &&
        obj.x + obj.width > all[j].x &&
        obj.y < all[j].y + all[j].height &&
        obj.y + obj.height > all[j].y) {
          collisions.push(all[j]);
      }
    }

    return collisions
}

// Constructing the AABB tree
constructAabbTree = function (boxes) {
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
    generateAABBs,
    constructQuadTree,
    constructAabbTree,
    queryQuadTree,
  };