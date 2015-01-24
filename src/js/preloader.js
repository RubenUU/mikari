(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.image('player', 'assets/player.png');
      this.load.image('bad', 'assets/bad.png');
      this.load.image('cool', 'assets/cool.png');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');



      this.load.audio('1', 'assets/audio/Bative_150124-090718.ogg');
      this.load.audio('2', 'assets/audio/Jotomi_150124-090727.ogg');
      this.load.audio('3', 'assets/audio/KaleKogi_150124-090337.ogg');
      this.load.audio('4', 'assets/audio/Kasurikaso_150124-090656.ogg');
      this.load.audio('5', 'assets/audio/Syvyvugylu_150124-090709.ogg');
      this.load.audio('6', 'assets/audio/Tope_Nihude_150124-090643.ogg');
      this.load.audio('7', 'assets/audio/Tyvipy_150124-090736.ogg');


    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['what'] = window['what'] || {};
  window['what'].Preloader = Preloader;

}());
