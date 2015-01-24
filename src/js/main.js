window.onload = function () {
  'use strict';

  var game
    , ns = window['what'];

  game = new Phaser.Game(640, 480, Phaser.AUTO, 'what-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game1', ns.Game1);
  game.state.add('game2', ns.Game2);
  game.state.add('game3', ns.Game3);
  game.state.add('game4', ns.Game4);
  game.state.add('game5', ns.Game5);
  game.state.add('game6', ns.Game6);
  /* yo phaser:state new-state-files-put-here */

  game.state.start('boot');

  game.points = 0;

  game.addPoints = function (){
    game.points++;
    //console.log(game.points);
  }

  

  game.createThings = function (config){

    var defaultConfig = {
      spriteName : 'bad',
      qty : 50,
      x : -100,
      y : -100,
      velocityX : 0,
      velocityY : 0,
      collideWorldBounds : false
    };

    config = _.isObject(config) ? config : {};
    config = _.extend(defaultConfig, config);

    console.log(config);

    var sprites = game.add.group();

    for (var i = 0; i < config.qty; i++)
    {
      var s = sprites.create(config.x, config.y, config.spriteName);
      //s.animations.add('spin', [0,1,2,3]);
      //s.play('spin', 20, true);
      game.physics.enable(s, Phaser.Physics.ARCADE);

      s.body.velocity.x = config.velocityX;
      s.body.velocity.y = config.velocityY;
    }

    sprites.setAll('body.collideWorldBounds', config.collideWorldBounds);
    sprites.setAll('body.bounce.y', 0.2);
    sprites.setAll('body.bounce.y', 0.2);
    sprites.setAll('body.minBounceVelocity', 0);
    sprites.setAll('body.minBounceVelocity', 0);
    sprites.setAll('checkWorldBounds', true);
    sprites.setAll('outOfBoundsKill', true);
    sprites.setAll('scale.x', 0.5);
    sprites.setAll('scale.y', 0.5);

    return sprites;
  }


  game.createThingsRandom = function () {
    return game.createThings({
      spriteName : 'bad',
      qty : 50,
      x : game.rnd.integerInRange(100, 700),
      y : game.rnd.integerInRange(32, 200),
      velocityX: game.rnd.integerInRange(-200, 200),
      velocityY: game.rnd.integerInRange(-200, 200)
    });
  }


};
