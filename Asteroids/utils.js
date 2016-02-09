// Utility code, vector math
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  Util.inherits = function (childClass, parentClass) {
    var Surrogate = function () {};

    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  };

  Util.dist = function (objOnePos, objTwoPos) {
    var diffX = objOnePos[0] - objTwoPos[0];
    var diffY = objOnePos[1] - objTwoPos[1];

    return Math.sqrt((diffX * diffX) + (diffY * diffY));
  };

  Util.inBounds = function (pos) {
    if (pos[0] < 0) { return false; }
    if (pos[1] < 0) { return false; }
    if (pos[0] > Asteroids.Game.DIM_X) { return false; }
    if (pos[1] > Asteroids.Game.DIM_Y) { return false; }
    return true;
  };

  Util.offScreen = function (obj) {
    if (obj.pos[0] < 0 || obj.pos[0] > 800) // Asteroids.Game.DIM_X)
      { return true; }
    if (obj.pos[1] < 0 || obj.pos[1] > 600) // Asteroids.Game.DIM_Y)
      { return true; }
    return false;
  };

  Util.spawnRand = function (level) {
    var rand = Math.random() * 100 + level / 100;
    switch (true) {
      case (rand < 65):
        return "asteroid";
      case (rand < 100):
        return "fighter";
      default:
        return "fighter";
    }
  };

})();
