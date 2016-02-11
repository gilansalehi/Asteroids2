(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var JetTrail = Asteroids.JetTrail = function (attr) {
    this.type = "explosion";
    this.pos = attr.pos;
    this.vel = [0, 2];
    this.radius = 4;
    this.color = "#ff9900";
    this.game = attr.game;
    this.cooldown = 15;
  };

  JetTrail.prototype.draw = function () {
    this.cooldown -= 1;
    this.pos = vMath.add(this.pos, this.vel);
    this.radius = this.cooldown / 3;
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
