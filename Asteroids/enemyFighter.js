(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Fighter = Asteroids.Fighter = function (attrs) {
    this.img = new Image ();
    this.img.src = 'Asteroid/assets/alien3.png';
    this.type = "fighter";
    this.team = "enemy";
    this.points = 10;
    this.pos = attrs.pos;
    this.vel = attrs.vel || [0, 0];
    this.radius = 20;
    this.color = "#ffa500";
    this.game = attrs.game;
    this.cooldown = 0;
    this.hp = 15;
    this.dmg = 100;
    this.viewDist = 70;
  };

  Asteroids.Util.inherits(Fighter, Asteroids.MovingObject);

  Fighter.prototype.power = function () {
    // debugger;
    var impulse = [0, 0];
    var enemyPos = this.game.ship.pos;

    var targetPos = vMath.div(vMath.add(this.pos, enemyPos), 2);
    // var goTo = Asteroids.Util.vMathDiv(Asteroids.Util.vMathAdd(this.pos, targetPos), 2));

    // tracks players ship
    if (this.pos[0] > targetPos[0]) { impulse[0] = -0.1; } else { impulse[0] = 0.1; }
    if (this.pos[1] > targetPos[1]) { impulse[1] = -0.1; } else { impulse[1] = 0.1; }

    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];

    var speedlimit = 3;
    if (this.vel[0] > speedlimit) { this.vel[0] = speedlimit; }
    if (this.vel[0] < - speedlimit) { this.vel[0] = -speedlimit; }
    if (this.vel[1] > speedlimit) { this.vel[1] = speedlimit; }
    if (this.vel[1] < - speedlimit) { this.vel[1] = -speedlimit; }
  };

  Fighter.prototype.reactTo = function (obj) {
    if (this.radius <= obj.radius) {

      switch (obj.type) {
        case "asteroid":
          this.vel = vMath.add(this.vel, this.avoid(obj, 0.2));
          break;
        case "frigate":
          this.vel = vMath.add(this.vel, this.avoid(obj, 0.2));
          break;
        default:
          console.log("Ahhhh a big " + obj.type + "!");
      }
    }
  };

  Fighter.prototype.fireBullet = function () {
    if (this.cooldown < 0) {
      this.cooldown = 60;

      var targetDir = vMath.normalize(vMath.subt(this.game.ship.pos, this.pos));
      var bulletDiff = vMath.mult(targetDir, 30);
      var spawnPos = vMath.add(this.pos, bulletDiff);

      var bullet = new Asteroids.EnemyBullet({
        pos: spawnPos,
        vel: vMath.mult(targetDir, 7),
        game: this.game
      });

      this.game.movingObjects.push(bullet);
    }
  };

  Fighter.prototype.move = function () {
    this.power();
    this.fireBullet();

    var origX = this.pos[0];
    var origY = this.pos[1];

    var dx = this.vel[0];
    var dy = this.vel[1];

    var posX = origX + dx;
    var posY = origY + dy;

    this.cooldown -= 1;
    this.pos = [posX, posY];
  };

  Fighter.prototype.draw = function () {
    ctx.drawImage(this.img, this.pos[0] - 20, this.pos[1] - 20, 40, 40);
  };


})();
