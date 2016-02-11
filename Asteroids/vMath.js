// Utility code, vector math
(function () {
  if (typeof Asteroids === "undefined") {
    window.vMath = {};
  }

  var vMath = window.vMath = {};

  vMath.add = function (vec1, vec2) {
    return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
  };

  Array.prototype.plus = function (vec) {
    return [this[0] + vec[0], this[1] + vec[1]];
  };

  vMath.subt = function (vec1, vec2) {
    return [vec1[0] - vec2[0], vec1[1] - vec2[1]];
  };

  Array.prototype.minus = function (vec) {
    return [this[0] - vec[0], this[1] - vec[1]];
  };

  vMath.mult = function (vec1, x) {
    return [vec1[0] * x, vec1[1] * x];
  };

  Array.prototype.times = function (x) {
    return [this[0] * x, this[1] * x];
  };

  vMath.div = function (vec1, x) {
    if (x === 0) return vec1;
    return [vec1[0] / x, vec1[1] / x];
  };

  Array.prototype.over = function (x) {
    if (x === 0) return this;
    return [this[0] / x, this[1] / x];
  };

  vMath.rand = function (length) {
    var randX = (Math.random() * 2) - 1;
    var randY = (Math.random() * 2) - 1;

    return [(randX * length), (randY * length)];
  };

  vMath.length = function (vector) {
    var length = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
    return length;
  };

  vMath.normalize = function (vector) {
    var length = vMath.length(vector);
    return vMath.div(vector, length);
  };
})();
