// Base class for anything that moves
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (attrs) {
    this.pos = attrs.pos; //Expect pos to be array of 2 elements
    this.vel = attrs.vel;
    this.radius = attrs.radius;
    this.color = attrs.color;
    this.game = attrs.game;
  };

  MovingObject.prototype.draw = function (ctx) {
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

  MovingObject.prototype.move = function () {
    var origX = this.pos[0];
    var origY = this.pos[1];

    var dx = this.vel[0];
    var dy = this.vel[1];

    var posX = origX + dx;
    var posY = origY + dy + 1; // +1 gives the game vertical drift

    this.pos = [posX, posY];
  };

  MovingObject.prototype.approach = function (obj, str) {
    var impulse = [0, 0];
    var targetPos = obj.pos;

    if (this.pos[0] > targetPos[0]) { impulse[0] = -str; } else { impulse[0] = str; }
    if (this.pos[1] > targetPos[1]) { impulse[1] = -str; } else { impulse[1] = str; }

    return impulse;
  };

  MovingObject.prototype.avoid = function (obj, str) {
    var impulse = [0, 0];
    var targetPos = obj.pos;

    if (this.pos[0] < targetPos[0]) { impulse[0] = -str; } else { impulse[0] = str; }
    if (this.pos[1] < targetPos[1]) { impulse[1] = -str; } else { impulse[1] = str; }

    return impulse;
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var distObjs = Asteroids.Util.dist(this.pos, otherObject.pos);

    return distObjs < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    if (this.type === "asteroid" && otherObject.type === "asteroid") {
        this.decompose();
        otherObject.decompose();
    } else {
      this.hp -= otherObject.dmg;
      otherObject.hp -= this.dmg;
      if (this.hp < 0 || this.radius <= otherObject.radius ) {
        this.game.destroy(this);
      }
      if (otherObject.hp < 0 || otherObject.radius <= this.radius) {
        this.game.destroy(otherObject);
      }
      if (this.type === "bullet") {
        this.game.addText({
          text: "-" + Math.floor(this.dmg),
          pos: otherObject.pos,
          drift: [0.1, -0.1]
        });
      }
      if (otherObject.type === "bullet") {
        this.game.addText({
          text: "-" + Math.floor(otherObject.dmg),
          pos: this.pos,
          drift: [0.1, -0.1]
        });
      }
    }
  };

})();
