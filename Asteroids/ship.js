(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (attrs) {
    this.imgUrl = "";
    this.type = "ship";
    this.pos = attrs.pos;
    this.vel = [0, 0];
    this.radius = 20;
    this.color = "#a1e5dd";
    this.game = attrs.game;
    this.cooldown = 0;
    this.hp = 100;
    this.dmg = 0;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    // debugger;
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];

    var speedlimit = 5;
    if (this.vel[0] > speedlimit) { this.vel[0] = speedlimit; }
    if (this.vel[0] < - speedlimit) { this.vel[0] = -speedlimit; }
    if (this.vel[1] > speedlimit) { this.vel[1] = speedlimit; }
    if (this.vel[1] < - speedlimit) { this.vel[1] = -speedlimit; }
  };

  Ship.prototype.fireBullet = function () {
    if (this.cooldown < 0) {
      this.cooldown = 10;
      console.log(this.hp);
      var bulletPos = [this.pos[0], this.pos[1] - 25];
      var bullet = new Asteroids.Bullet({pos: bulletPos, game: this.game});
      this.game.movingObjects.push(bullet);
    }
  };

  Ship.prototype.move = function () {
    var origX = this.pos[0];
    var origY = this.pos[1];

    var dx = this.vel[0];
    var dy = this.vel[1];

    var posX = origX + dx;
    var posY = origY + dy;

    this.cooldown -= 1;
    this.pos = this.game.bounds([posX, posY]);
  };

})();
