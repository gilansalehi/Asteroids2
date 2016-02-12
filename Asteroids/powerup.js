(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var PowerUp = Asteroids.PowerUp = function (attrs) {
    this.type = attrs.type || "health";
    this.team = "powerup";
    this.points = 10;
    this.pos = attrs.pos;
    this.vel = attrs.vel || [0, 3];
    this.radius = 15;
    this.color = "#ff3300";
    this.game = attrs.game;
    this.cooldown = 0;
    this.hp = 1;
    this.dmg = 0;
    this.viewDist = 35;
  };

  Asteroids.Util.inherits(PowerUp, Asteroids.MovingObject);

  PowerUp.prototype.reactTo = function (obj) {
    if (this.radius <= obj.radius) {

      switch (obj.type) {
        case "asteroid":
          this.vel = vMath.add(this.vel, this.avoid(obj, 0.3));
          break;
        case "frigate":
          this.vel = vMath.add(this.vel, this.avoid(obj, 0.3));
          break;
        default:
          console.log("Ahhhh a big " + obj.type + "!");
      }
    }
  };

  PowerUp.prototype.acquire = function () {
    switch (this.type) {
      case "health":
        this.game.ship.hp += 100;
        this.game.addText({
          text: "+100",
          color: "33ff33",
          pos: this.pos,
          drift: [0.1, -0.1]
        });
        break;
      case "dmg":
        this.game.ship.dmg += 2;
        this.game.addText({
          text: "level up!",
          color: "0033aa",
          pos: this.pos,
          drift: [0.1, -0.1]
        });
        break;
      default:
        this.game.score += 25;
    }
  };

  PowerUp.prototype.move = function () {

    var origX = this.pos[0];
    var origY = this.pos[1];

    var dx = this.vel[0];
    var dy = this.vel[1];

    var posX = origX + dx;
    var posY = origY + dy;

    this.cooldown -= 1;
    this.pos = [posX, posY];
  };

})();
