(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var EnemyBullet = Asteroids.EnemyBullet = function (attr) {
    this.type = "bullet";
    this.team = "neutral";
    this.pos = attr.pos;
    this.vel = attr.vel || [0, 10];
    this.radius = 5;
    this.color = "#ff0000";
    this.game = attr.game;
    this.hp = 1;
    this.dmg = 10;
  };

  Asteroids.Util.inherits(EnemyBullet, Asteroids.MovingObject);

})();
