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

    this.spawnCounter = 0;
    this.score = 0;

    this.textObjects.push(this.addScore());
    // this.movingObjects.push(this.ship);
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      this.movingObjects.push(this.addAsteroids());
    }
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
    var text = new Asteroids.Text (attrs);
    this.textObjects.push(text);
  }

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
    })
  };

  Game.prototype.moveObjects = function () {
    // debugger;
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
      if (Asteroids.Util.offScreen(object)) {this.remove(object)}
    }.bind(this))
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
      }
    }
  };

  Game.prototype.step = function () {
    this.score += 1;
    this.spawnObjects();
    this.updateTextObjects();
    this.moveObjects();
    this.checkCollisions();
    this.cleanUp();
  };

  Game.prototype.remove = function (object) {
    if (object.type === "ship") {
      this.addText({
        text: "GAME OVER",
        pos: [this.dim_x / 2, this.dim_y / 2],
        size: 60,
        timeout: 200,
        textAlign: "center",
        drift: [0, 0],
        game: this
      });
      this.score = 0;
    }
    // use splice to delete elements at index i...
    var i = this.movingObjects.indexOf(object);
    return this.movingObjects.splice(i, 1);
  };

  Game.prototype.removeText = function (object) {
    var i = this.textObjects.indexOf(object);
    return this.textObjects.splice(i, 1);
  };

  Game.prototype.destroy = function (object) {
    if (object.type === "asteroid") {
      object.decompose();
    } else {
      this.remove(object);
    }
  };

  Game.prototype.spawnObjects = function () {
    this.spawnCounter -= 1;
    if (this.spawnCounter < 0) {
      this.spawn();
      this.spawnCounter = 50;
    }
  }

  Game.prototype.randPosition = function () {
    var xPos = Math.random() * DIM_X;
    var yPos = 0; // Math.random() * DIM_Y; <-- originally this was the value...
    return [xPos, yPos];
  };

  Game.prototype.spawn = function (spawn) {
    var spawn = spawn || Asteroids.Util.spawnRand(this.score);
    switch (spawn) {
      case "asteroid":
        var asteroid = new Asteroids.Asteroid({pos: this.randPosition(), game: this});
        this.movingObjects.push(asteroid);
        break;
      case "fighter":
        var fighter = new Asteroids.Fighter({pos: this.randPosition(), game: this});
        this.movingObjects.push(fighter);
        console.log("a fighter has spawned!");
      default:
        console.log("got default");
    }
  }

})();
