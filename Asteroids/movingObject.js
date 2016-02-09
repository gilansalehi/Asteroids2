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
    // debugger;
    this.pos = [posX, posY];
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var distObjs = Asteroids.Util.dist(this.pos, otherObject.pos);

    return distObjs < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    if (this.type === "asteroid" && otherObject.type === "asteroid") {
        this.decompose();
        otherObject.decompose();
    } else if (this.radius < otherObject.radius) {
      this.game.destroy(this);
      otherObject.hp -= this.radius;
      if (otherObject.hp < 0) { this.game.destroy(otherObject); }
      this.game.addText({
        text: "-" + Math.floor(this.radius),
        pos: otherObject.pos,
        game: this.game,
      }); // add in floating text to represent damage
    } else if (this.radius > otherObject.radius) {
      this.game.destroy(otherObject);
      this.hp -= otherObject.radius;
      if (this.hp < 0) { this.game.destroy(this); }
      this.game.addText({
        text: "-" + Math.floor(otherObject.radius),
        pos: this.pos,
        game: this.game,
      });
    } else {
      this.game.destroy(this);
      this.game.destroy(otherObject);
    }
  };

})();
