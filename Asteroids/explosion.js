(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Explosion = Asteroids.Explosion = function (attr) {
    this.type = "explosion";
    this.pos = attr.pos;
    this.vel = [0, 0];
    this.radius = 1;
    this.color = "#ff9900";
    this.game = attr.game;
    this.hp = 1;
    this.dmg = 0;
    this.cooldown = 50;
  };

  Explosion.prototype.draw = function () {
    this.cooldown -= 1;
    this.radius = 51 - this.cooldown;
    if (this.cooldown <= 0) { this.game.removeFX(this); }

    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

})();
