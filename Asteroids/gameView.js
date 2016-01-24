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
    if(key.isPressed("down")) { window.game.ship.power([0, 1]); }
    if(key.isPressed("left")) { window.game.ship.power([-1, 0]); }
    if(key.isPressed("right")) { window.game.ship.power([1, 0]); }
    if(key.isPressed("space")) { window.game.ship.fireBullet(); };
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
