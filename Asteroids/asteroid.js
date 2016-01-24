// asteroid
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (attr) {
    this.type = "asteroid";
    this.pos = attr.pos;
    this.radius = attr.radius || (40 + Math.random() * 20);
    this.vel = attr.vel || vMath.rand(10 / this.radius);
    this.color = "#808080";
    this.game = attr.game;
    this.hp = this.radius * this.radius;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.decompose = function () {
    if (this.radius >= 8) {
      // change this to decompose based on the pos of the other asteroid.
      var randVec = vMath.rand(this.radius / 2)
      var newPos1 = vMath.add(this.pos, randVec);
      var newPos2 = vMath.subt(this.pos, randVec);
      //
      // var randVec = Asteroids.Util.randomVec(this.radius / 2);
      // var newPos1 = Asteroids.Util.vMathAdd(this.pos, randVec);
      // var newPos2 = Asteroids.Util.vMathSubt(this.pos, randVec);

      var child1 = new Asteroids.Asteroid({
        pos: newPos1,
        radius: this.radius / 2,
        vel: vMath.add(this.vel, vMath.rand(0.5)),
        game: this.game,
      });

      var child2 = new Asteroids.Asteroid({
        pos: newPos2,
        radius: this.radius / 2,
        vel: vMath.add(this.vel, vMath.rand(0.5)),
        game: this.game,
      });

      this.game.remove(this);
      this.game.movingObjects.push(child1, child2);
      console.log("Asteroid cracked in half!");
    } else {
      this.game.remove(this);
    }
  }

})();
