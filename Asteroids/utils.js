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
    if (pos[0] > Asteroids.Game.dim_x()) { return false; }
    if (pos[1] > Asteroids.Game.dim_y()) { return false; }
    return true;
  };

  Util.offScreen = function (obj) {
    if (obj.pos[0] < 0 || obj.pos[0] > Asteroids.Game.dim_x()) // Asteroids.Game.DIM_X)
      { return true; }
    if (obj.pos[1] < 0 || obj.pos[1] > Asteroids.Game.dim_y() + 100) // Asteroids.Game.DIM_Y)
      { return true; }
    return false;
  };

  Util.spawnRand = function (level) {
    var rand = Math.random() * 100 + level / 100;
    switch (true) {
      case (rand < 75):
        return "fighter";
      case (rand < 85):
        return "powerup";
      case (rand < 100):
        return "frigate";
      case (rand < 105):
        return "fasteroid";
      case (rand < 500):
        return "frigate";
      default:
        return "fighter";
    }
  };

})();
