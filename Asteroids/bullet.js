// bullet
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (attr) {
    this.type = "bullet";
    this.pos = attr.pos;
    this.vel = [0, -10];
    this.radius = 6;
    this.color = "#00ff00";
    this.game = attr.game;
    this.hp = 1;
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  // Bullet.prototype.remove = function () {
  //   if (!Asteroids.Utils.inBounds(this.pos)) {
  //     this.game.movingObjects.remove(this);;
  //   }
  // };

  // Bullet.prototype.collideWith = function (otherObject) {
  //   this.game.remove(this);
  // };

})();
