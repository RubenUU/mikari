(function() {
  'use strict';

  function Game6() {
    this.player = null;
  }

  Game6.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;



      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      //this.game.stage.backgroundColor = '#313131';

      this.bullets = this.game.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

      this.bullets.createMultiple(50, 'cool');
      this.bullets.setAll('checkWorldBounds', true);
      this.bullets.setAll('outOfBoundsKill', true);
      this.bullets.setAll('scale.x', 0.5);
      this.bullets.setAll('scale.y', 0.5);
      
      this.player = this.game.add.sprite(x, y, 'cool');
      this.player.anchor.set(0.5);

      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

      this.player.body.allowRotation = false;
      this.player.body.immovable = true;

      this.fireRate = 600;
      this.nextFire = 0;


      //this.cool = this.createThings('cool', 30);
      //this.bad = this.createThings('bad', 30);

      this.player.cool = true;
      this.player.power = 'cool';

      this.input.onDown.add(this.onDown, this);

      this.points = 0;

    },

    onDown : function () {

      this.player.cool = !this.player.cool;

      if(this.player.cool){
        this.player.power = 'cool';
        this.player.loadTexture('cool');
      }
      else{
        this.player.power = 'bad';
        this.player.loadTexture('bad');
      }
    },
    

    revive: function(){

      /*var body = this.cool.getAllDead();
      body.revive();
      body.x = this.player.x;
      body.y = this.player.y;*/

      var that = this;

      if(this.player.cool){
        var enemies = this.cool;
      }
      else{
        var enemies = this.bad;
      }

      enemies.forEachDead(function(body){
        body.revive();
        body.x = that.player.x + that.game.rnd.integerInRange(-50, 50) + that.player.scale.x + 100;
        body.y = that.player.y + that.game.rnd.integerInRange(-50, 50) + that.player.scale.x + 100;
      });

    },

    createThings : function (spriteName, qty, x, y){
      var sprites = this.game.add.group();

      for (var i = 0; i < qty; i++)
      {
        if(x && y){
          var s = sprites.create(x, y, spriteName);
        }
        else{
          var s = sprites.create(200, 0, spriteName);
        }
        //s.animations.add('spin', [0,1,2,3]);
        //s.play('spin', 20, true);
        this.game.physics.enable(s, Phaser.Physics.ARCADE);
        //s.body.velocity.x = this.game.rnd.integerInRange(-100, 100);
        s.body.velocity.y = 100;
      }

      //sprites.setAll('body.collideWorldBounds', true);
      sprites.setAll('body.bounce.x', 0.2);
      sprites.setAll('body.bounce.y', 0.2);
      sprites.setAll('body.minBounceVelocity', 0);
      sprites.setAll('scale.x', 0.5);
      sprites.setAll('scale.y', 0.5);

      return sprites;
    },

    getPoints : function (sprite){
      sprite.kill();

      this.player.scale.x+=0.1;
      this.player.scale.y+=0.1;

      this.points++;
      this.game.addPoints();
      
    },

    collisionHandlerCool: function (player, sprite) {


      if(this.player.power !== sprite.enemyType ){
        this.game.state.start('menu');
      }else{
        this.getPoints(sprite);
      }
      
    },

    collisionHandlerBad: function (player, sprite) {

      if(this.player.cool){
        this.game.state.start('menu');
      }else{
        this.getPoints(sprite);
      }
      
    },

    collisionHandlerBulletsBad: function (bullet, sprite) {

      if(!this.player.cool){
        this.game.state.start('menu');
      }
      else{
        sprite.kill();
        bullet.kill();
      }
      
    },

    collisionHandlerBulletsCool: function (bullet, sprite) {

      if(this.player.cool){
        this.game.state.start('menu');
      }
      else{
        sprite.kill();
        bullet.kill();
      }
      
    },

    update: function () {

    this.game.physics.arcade.collide(this.bullets, this.player, this.collisionHandlerCool, null, this);

      this.player.rotation = this.game.physics.arcade.angleToPointer(this.player);

      this.fireRate-=0.5;
      this.fire();

    },

    fire: function () {
      if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
      {

          this.nextFire = this.game.time.now + this.fireRate;

          var bullet = this.bullets.getFirstDead();

          var rnd = Math.random();
          var maximum = 300;
          var minimum = 100;
          var randomnVel = Math.floor(Math.random() * (maximum - minimum)) + minimum;
          if (rnd < 0.25)
          {
            bullet.reset(this.game.width/2 - 8, 0);
            bullet.body.velocity.y = randomnVel;
          } else if(rnd > 0.25 && rnd < 0.50) {
            bullet.reset(this.game.width/2 - 8, this.game.height);
            bullet.body.velocity.y = -randomnVel;
          } else if(rnd > 0.50 && rnd < 0.75) {
            bullet.reset(0, this.game.height/2);
            bullet.body.velocity.x = randomnVel;
          } else {
            bullet.reset(this.game.width, this.game.height/2);
            bullet.body.velocity.x = -randomnVel;
          }
          //this.game.physics.arcade.moveToPointer(bullet, 300);
          //bullet.body.velocity.y = 300;

          bullet.enemyType = (Math.random() < 0.5) ? 'cool' : 'bad';
          bullet.loadTexture(bullet.enemyType);

      }
    }

  };

  window['what'] = window['what'] || {};
  window['what'].Game6 = Game6;

}());
