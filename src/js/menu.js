(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'what do we do now' );
      this.titleTxt.align = 'center';
      this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'START');
      this.startTxt.align = 'center';
      this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

      this.input.onDown.add(this.onDown, this);
      //this.game.state.start('game');
      this.game.maxGames = 4;
      //this.game.state.start('game2');
      
    },

    update: function () {

    },

    onDown: function () {
      //this.game.state.start('game2');

      this.game.i++;

      
      if(this.game.i > this.game.maxGames){
        this.game.i = 1;
      }
      this.game.state.start('game'+this.game.i);
    }
  };

  window['what'] = window['what'] || {};
  window['what'].Menu = Menu;

}());
