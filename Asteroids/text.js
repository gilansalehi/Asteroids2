// Utility code, vector math
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Text = Asteroids.Text = function (attrs) {
    this.pos = attrs.pos || [0, 0];
    this.size = attrs.size || 20;
    this.text = attrs.text || "";
    this.color = attrs.color || "#ff0000";
    this.font = attrs.font || (this.size + "px sans-serif");
    this.textAlign = attrs.textAlign || "left";
    this.age = 0;
    this.timeout = attrs.timeout || 20;
    this.drift = attrs.drift || [0.1, -0.1];
    this.game = attrs.game;
  };

  Text.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.textAlign = this.textAlign;
    ctx.fillText(this.text.slice(), this.pos[0], this.pos[1]);
  };

  Text.prototype.update = function () {
    // this.text = "SCORE: " + this.game.score;
    this.age += 1;
    this.pos = vMath.add(this.pos, this.drift);
    if (this.age > this.timeout) { this.game.removeText(this); }
  };

})();
