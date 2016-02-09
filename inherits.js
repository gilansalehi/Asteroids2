Function.prototype.inherits = function (parent) {
  var self = this;
  var Surrogate = function () {};

  Surrogate.prototype = parent.prototype;
  self.prototype = new Surrogate();
  self.prototype.constructor = self;
};
