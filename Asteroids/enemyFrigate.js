(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Frigate = Asteroids.Frigate = function (attrs) {
    this.type = "frigate";
    this.team = "enemy";
    this.points = 100;
    this.pos = attrs.pos;
    this.vel = [0, 0];
    this.radius = 35;
    this.color = "#ffbb00";
    this.game = attrs.game;
    this.cooldownDeploy = 240;
    this.cooldownFire = 60;
    this.hp = 55;
    this.dmg = this.radius;
  };

  Asteroids.Util.inherits(Frigate, Asteroids.MovingObject);

  Frigate.prototype.power = function () {
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

    var speedlimit = 1;
    if (this.vel[0] > speedlimit) { this.vel[0] = speedlimit; }
    if (this.vel[0] < - speedlimit) { this.vel[0] = -speedlimit; }
    if (this.vel[1] > speedlimit) { this.vel[1] = speedlimit; }
    if (this.vel[1] < - speedlimit) { this.vel[1] = -speedlimit; }
  };

  Frigate.prototype.deployFighter = function () {
    if (this.cooldownDeploy < 0) {
      this.cooldownDeploy = 120;

      var targetDir = vMath.normalize(vMath.subt(this.game.ship.pos, this.pos));
      var spawnDiff = vMath.mult(targetDir, 70);
      var spawnPos = vMath.add(this.pos, spawnDiff);

      var fighter = new Asteroids.Fighter({
        pos: spawnPos,
        vel: vMath.mult(targetDir, 2),
        game: this.game
      });

      this.game.movingObjects.push(fighter);
    }
  };

  Frigate.prototype.fireBullet = function () {
    if (this.cooldownFire < 0) {
      this.cooldownFire = 60;

      var targetDir = vMath.normalize(vMath.subt(this.game.ship.pos, this.pos));
      var bulletDiff = vMath.mult(targetDir, 50);
      var spawnPos = vMath.add(this.pos, bulletDiff);

      var bullet = new Asteroids.EnemyBullet({
        pos: spawnPos,
        vel: vMath.mult(targetDir, 7),
        game: this.game
      });

      this.game.movingObjects.push(bullet);
    }
  };

  Frigate.prototype.move = function () {
    this.power();
    this.fireBullet();
    this.deployFighter();

    var origX = this.pos[0];
    var origY = this.pos[1];

    var dx = this.vel[0];
    var dy = this.vel[1];

    var posX = origX + dx;
    var posY = origY + dy;

    this.cooldownDeploy -= 1;
    this.cooldownFire -= 1;
    this.pos = [posX, posY];
  };

})();
