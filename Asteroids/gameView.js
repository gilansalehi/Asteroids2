(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.bindKeyHandlers = function () {
    if(key.isPressed("up")) { window.game.ship.power([0, -1]); }
    if(key.isPressed("w")) { window.game.ship.power([0, -1]); }
    if(key.isPressed("down")) { window.game.ship.power([0, 1]); }
    if(key.isPressed("s")) { window.game.ship.power([0, 1]); }
    if(key.isPressed("left")) { window.game.ship.power([-1, 0]); }
    if(key.isPressed("a")) { window.game.ship.power([-1, 0]); }
    if(key.isPressed("right")) { window.game.ship.power([1, 0]); }
    if(key.isPressed("d")) { window.game.ship.power([1, 0]); }
    if(key.isPressed("space")) { window.game.ship.fireBullet(); }
    if(key.isPressed("z")) { console.log("fire missile"); }
    if(key.isPressed("x")) { console.log(window.game.ship.hp); }
    if(key.isPressed("c")) { console.log(window.game.movingObjects.length); }
    if(key.isPressed("p")) { window.game.pause = true; }
    if(key.isPressed("o")) { window.game.pause = false; }
    if(key.isPressed("enter")) { window.game.pause = false; }
  };

  GameView.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");

    window.setInterval( function () {
      GameView.prototype.bindKeyHandlers();
      this.game.step();
      this.game.draw(this.ctx);
    }, 25);

  };

})();
