// Utility code, vector math
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var HUD = Asteroids.HUD = function (attrs) {
    this.pos = [5, 595];
    this.size = 20;
    this.text = attrs.text || "";
    this.color = attrs.color || "#ff0000";
    this.font = attrs.font || ("bold " + this.size + "px sans-serif");
    this.age = 0;
    this.timeout = null;
    this.textAlign = "left";
    this.game = attrs.game;
  };

  Asteroids.Util.inherits(HUD, Asteroids.Text);

  HUD.prototype.update = function () {
    // this.text = "SCORE: " + this.game.score;
    this.text = "SCORE: " + this.game.score + "   HP: " + Math.floor(this.game.ship.hp);
  };

})();
