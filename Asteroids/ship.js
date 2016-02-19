(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (attrs) {
    this.img = new Image ();
    this.img.src = 'Asteroids/assets/spaceship2.png';
    this.type = "ship";
    this.pos = attrs.pos;
    this.vel = [0, 0];
    this.radius = 20;
    this.color = "#a1e5dd";
    this.game = attrs.game;
    this.cooldown = 0;
    this.jetsCooldown = 4;
    this.hp = 100;
    this.dmg = 10;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    // debugger;
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];

    var speedlimit = 5;
    if (this.vel[0] > speedlimit) { this.vel[0] = speedlimit; }
    if (this.vel[0] < - speedlimit) { this.vel[0] = -speedlimit; }
    if (this.vel[1] > speedlimit) { this.vel[1] = speedlimit; }
    if (this.vel[1] < - speedlimit) { this.vel[1] = -speedlimit; }
  };

  Ship.prototype.fireBullet = function () {
    if (this.cooldown < 0) {
      this.cooldown = 10;
      console.log(this.hp);
      var bulletPos = [this.pos[0], this.pos[1] - 25];
      var bullet = new Asteroids.Bullet({ pos: bulletPos, dmg: this.dmg, game: this.game });
      this.game.movingObjects.push(bullet);
      console.log(this.game.movingObjects.length);
    }
  };

  Ship.prototype.drawJets = function () {
    if (this.jetsCooldown < 0) {
      this.jetsCooldown = 1;
      var jetsPos = [this.pos[0], this.pos[1] + 25];
      var jet = new Asteroids.JetTrail({
        pos: jetsPos,
        color: this.color,
        game: this.game
      });
      this.game.visualFX.push(jet);
    }
  };

  Ship.prototype.move = function () {
    this.drawJets();

    var origX = this.pos[0];
    var origY = this.pos[1];

    var dx = this.vel[0];
    var dy = this.vel[1];

    var posX = origX + dx;
    var posY = origY + dy;

    this.cooldown -= 1;
    this.jetsCooldown -=1;
    this.pos = this.game.bounds([posX, posY]);
  };

  Ship.prototype.draw = function () {
    ctx.drawImage(this.img, this.pos[0] - 20, this.pos[1] - 20, 40, 40);
  };

})();
