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
  /* yo phaser:state new-state-files-put-here */

  game.state.start('boot');
};
