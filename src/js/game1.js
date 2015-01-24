(function() {
  'use strict';

  function Game1() {
    this.player = null;
  }

  Game1.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      //this.game.stage.backgroundColor = '#0072bc';

      this.player = this.game.add.sprite(this.game.width/2, this.game.height, 'cool');
      this.player.anchor.setTo(0.5, 0.5);

      //  Enable Arcade Physics for the this.player
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

      //  Tell it we don't want physics to manage the rotation
      this.player.body.allowRotation = false;

      this.cool = this.createThings('cool', 30);
      this.bad = this.createThings('bad', 30);

      this.points = 0;


      this.input.onDown.add(this.onDown, this);

      this.player.cool = true;


    },

    onDown : function () {
      
      //this.player.scale.x-=0.1;
      //this.player.scale.y-=0.1;
      this.player.scale.x = 1;
      this.player.scale.y = 1;
      //this.cool = this.createThings('cool', 1, this.player.x, this.player.y);
      this.revive();

      this.player.loadTexture('bad');

      this.player.cool = !this.player.cool;

      if(this.player.cool){
        this.player.loadTexture('cool');
      }
      else{
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
          var s = sprites.create(this.game.rnd.integerInRange(100, 700), this.game.rnd.integerInRange(32, 200), spriteName);
        }
        //s.animations.add('spin', [0,1,2,3]);
        //s.play('spin', 20, true);
        this.game.physics.enable(s, Phaser.Physics.ARCADE);
        s.body.velocity.x = this.game.rnd.integerInRange(-200, 200);
        s.body.velocity.y = this.game.rnd.integerInRange(-200, 200);
      }

      sprites.setAll('body.collideWorldBounds', true);
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
      //this.game.state.start('menu');
      //console.log(sprite);
      

      if(!this.player.cool){
        console.log(this.points);
        this.game.state.start('menu');
      }else{
        this.getPoints(sprite);
      }

      
    },

    collisionHandlerBad: function (player, sprite) {

      if(this.player.cool){
        console.log(this.points);
        this.game.state.start('menu');
      }
      else{
        this.getPoints(sprite);
      }
      
    },

    update: function () {

      this.game.physics.arcade.collide(this.player, this.cool, this.collisionHandlerCool, null, this);
      this.game.physics.arcade.collide(this.player, this.bad, this.collisionHandlerBad, null, this);

      this.player.rotation = this.game.physics.arcade.moveToPointer(this.player, 60, this.game.input.activePointer, 500);

    },

    onInputDown: function () {
      this.game.state.start('menu');
    }

  };

  window['what'] = window['what'] || {};
  window['what'].Game1 = Game1;

}());
