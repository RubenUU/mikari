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

      y = y - 70;
      this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'what do we do now' );
      this.titleTxt.align = 'center';
      this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;


      y = y + this.titleTxt.height + 55;
      this.startTxt = this.add.bitmapText(x, y, 'minecraftia', this.game.points + ' points');
      this.startTxt.align = 'center';
      this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;


      y = y + this.titleTxt.height + 35;
      this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'START');
      this.startTxt.align = 'center';
      this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;


      this.input.onDown.add(this.onDown, this);
      //this.game.state.start('game');
      this.game.maxGames = 7;
      //this.game.state.start('game3');
      

      
    },

    update: function () {

    },

    onDown: function () {
      //this.game.state.start('game2');
      //this.game.state.start('game5');
      //

      this.game.i++;

      if(this.game.i > this.game.maxGames){
        this.game.i = 1;
      }


      if(this.game.music){
        this.game.music.stop();
      }

      this.game.music = this.game.add.audio(this.game.i, 1, true);
      this.game.music.play('', 0, 1, true);



      this.game.state.start('game'+this.game.i);
    }
  };

  window['what'] = window['what'] || {};
  window['what'].Menu = Menu;

}());
