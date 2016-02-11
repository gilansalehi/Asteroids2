/* Game (lib/game.js)
Holds collections of the movingObjects, bullets, and your ship.
#step method calls #move on all the objects, and #checkCollisions checks for colliding objects.
#draw(ctx) draws the game.
Keeps track of dimensions of the space; wraps objects around when they drift off the screen.
*/

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIM_X = 800;
  var DIM_Y = 600;
  var NUM_ASTEROIDS = 4;

  var Game = Asteroids.Game = function () {
    this.dim_x = DIM_X;
    this.dim_y = DIM_Y;
    this.ship = new Asteroids.Ship ({pos: [DIM_X / 2, DIM_Y / 2], game: this});

    this.textObjects = [];
    this.movingObjects = [];
    this.visualFX = [];

    this.spawnCounter = 0;
    this.score = 0;
    this.pause = false;

    this.start();
  };

  Game.prototype.start = function () {
    this.addText({text: "Gauntlet Run", size: 60, color: "#ffaa00", pos: [200, 200] });
    this.addText({
      text: "Use arrow keys to move",
      size: 40,
      color: '#ffaa00',
      pos: [100, 250],
    });
    this.addText({
      text: "Hold space to fire",
      size: 40,
      color: '#ffaa00',
      pos: [100, 300],
    });
    this.addText({
      text: "Don't crash into the asteroids!",
      size: 40,
      color: '#ffaa00',
      pos: [100, 350],
    });
    this.addText({
      text: "Press P to pause and O to start",
      size: 40,
      color: '#ffaa00',
      pos: [100, 400],
    });

    this.reset();
  };

  Game.prototype.reset = function () {
    this.movingObjects = [];
    this.textObjects.push(this.addScore());
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      this.movingObjects.push(this.addAsteroids());
    }
    this.ship.hp = 100;
    this.pause = true;
  };

  Game.prototype.addAsteroids = function () {
    return new Asteroids.Asteroid ({pos: this.randPosition(), game: this});
  };

  Game.prototype.addScore = function () {
    return new Asteroids.HUD ({
      text: "SCORE: " + this.score,
      pos: [10, this.dim_y],
      game: this,
    });
  };

  Game.prototype.addText = function (attrs) {
    attrs.game = this;
    var text = new Asteroids.Text (attrs);
    this.textObjects.push(text);
  };

  Game.prototype.addFX = function (attrs) {
    attrs.game = this;
    var effect = new Asteroids.Explosion (attrs);
    this.visualFX.push(effect);
  };

  Game.prototype.allObjects = function () {
    return this.movingObjects.concat(this.ship);
  };

  Game.prototype.draw = function (ctx) {
    //this will empty the canvas
    ctx.clearRect(0, 0, DIM_X, DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
    this.textObjects.forEach(function (text) {
      text.draw(ctx);
    });
    this.visualFX.forEach(function (effect) {
      effect.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.updateTextObjects = function () {
    this.textObjects.forEach(function (text) {
      text.update();
    });
  };

  Game.prototype.cleanUp = function () {
    this.movingObjects.forEach(function (object) {
      if (Asteroids.Util.offScreen(object)) { this.remove(object); }
    }.bind(this));
  };

  Game.prototype.bounds = function (pos) {
    var origX = pos[0];
    var origY = pos[1];

    if (origX >= DIM_X) { origX = DIM_X; }
    if (origX <= 0) { origX = 0; }
    if (origY >= DIM_Y) { origY = DIM_Y; }
    if (origY <= 0) { origY = 0; }

    return [origX, origY];
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.allObjects().length - 1; i++) {
      for (var j = i + 1; j < this.allObjects().length; j++) {
        var firstObject = this.allObjects()[i];
        var secondObject = this.allObjects()[j];
        if (firstObject.isCollidedWith(secondObject)) {
          firstObject.collideWith(secondObject);
        }
        if (firstObject.viewDist) {
          if (firstObject.viewDist > (Asteroids.Util
            .dist(firstObject.pos, secondObject.pos) - secondObject.radius)) {
              firstObject.reactTo(secondObject);
          }
        }
        if (secondObject.viewDist) {
          if (secondObject.viewDist > (Asteroids.Util
            .dist(firstObject.pos, secondObject.pos) - firstObject.radius)) {
              secondObject.reactTo(firstObject);
          }
        }
      }
    }
  };

  Game.prototype.step = function () {
    if (!this.pause) {
      this.spawnObjects();
      this.updateTextObjects();
      this.moveObjects();
      this.checkCollisions();
      this.cleanUp();
    }
  };

  Game.prototype.remove = function (object) {
    if (object.type === "ship" && this.score !== 0) { // && Game isn't already over
      this.addText({
        text: "GAME OVER",
        pos: [this.dim_x / 2, this.dim_y / 2],
        size: 60,
        color: '#ffaa00',
        textAlign: "center",
        drift: [0, 0],
        game: this
      });
      this.addText({
        text: "Score: " + this.score,
        pos: [this.dim_x / 2, this.dim_y / 2 + 50],
        color: '#ffaa00',
        textAlign: "center",
        size: 40,
        game: this,
      });
      this.score = 0;
      this.pause = true;
      this.reset();
    } else if (object.team === "enemy") {
      this.addFX({
        pos: object.pos,
      });
    }
    // use splice to delete elements at index i...
    var i = this.movingObjects.indexOf(object);
    return this.movingObjects.splice(i, 1);
  };

  Game.prototype.removeText = function (object) {
    var i = this.textObjects.indexOf(object);
    return this.textObjects.splice(i, 1);
  };

  Game.prototype.removeFX = function (object) {
    var i = this.visualFX.indexOf(object);
    return this.visualFX.splice(i, 1);
  };

  Game.prototype.destroy = function (object) {
    if (object.type === "asteroid") {
      object.decompose();
    } else {
      this.remove(object);
      if (object.points) {
        this.score += Math.floor(object.points);
      }
    }
  };

  Game.prototype.spawnObjects = function () {
    this.spawnCounter -= 1;
    if (this.spawnCounter < 0) {
      this.spawn();
      this.spawnCounter = 50;
    }
  };

  Game.prototype.randPosition = function () {
    var xPos = Math.random() * DIM_X;
    var yPos = 0; // Math.random() * DIM_Y; <-- originally this was the value...
    return [xPos, yPos];
  };

  Game.prototype.spawn = function (spawn) {
    var newSpawn = spawn || Asteroids.Util.spawnRand(this.score);
    switch (newSpawn) {
      case "asteroid":
        var asteroid = new Asteroids.Asteroid({pos: this.randPosition(), game: this});
        this.movingObjects.push(asteroid);
        break;
      case "fighter":
        var fighter = new Asteroids.Fighter({pos: this.randPosition(), game: this});
        this.movingObjects.push(fighter);
        break;
      case "frigate":
        var frigate = new Asteroids.Frigate({pos: this.randPosition(), game: this});
        this.movingObjects.push(frigate);
        console.log("Got frigate");
        break;
      default:
        console.log("got default");
    }
  };

})();
