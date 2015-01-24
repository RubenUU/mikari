(function() {
  'use strict';

  function Game3() {
    this.player = null;
  }

  Game3.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;



      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      //this.game.stage.backgroundColor = '#313131';
      
      this.player = this.game.add.sprite(x, this.game.height- 50, 'cool');
      this.player.anchor.set(0.5);

      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

      //this.player.body.allowRotation = false;
      this.player.body.immovable = true;

      this.fireRate = 300;
      this.nextFire = 0;


      //this.cool = this.createThings('cool', 30);
      this.bullets = this.game.createThings({
          spriteName : 'bad',
          x : -100,
          y : -100,
          velocityX : 0,
          velocityY : 0
        });

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

      this.game.physics.arcade.collide(this.bullets, this.player, null, this.collisionHandlerCool, this);

      this.player.rotation = this.game.physics.arcade.angleToPointer(this.player);
  
      this.player.x = this.game.input.activePointer.x;

      //this.fireRate-=0.5;
      this.fire();

    },

    fire: function () {
      if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
      {

        this.nextFire = this.game.time.now + this.fireRate;

        var bullet = this.bullets.getFirstDead();

        bullet.reset(this.game.rnd.integerInRange(20, this.game.width -20), 0);

        //this.game.physics.arcade.moveToPointer(bullet, 300);
        bullet.body.velocity.y = 300;

        bullet.enemyType = (Math.random() < 0.5) ? 'cool' : 'bad';
        bullet.loadTexture(bullet.enemyType);

      }
    },

    /*render: function () {

        this.game.debug.body(this.player);
        this.game.debug.body(this.bullets);

        // game.debug.body(sprite2);

    }*/

  };

  window['what'] = window['what'] || {};
  window['what'].Game3 = Game3;

}());
