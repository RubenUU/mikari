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
      this.pointsTxt = this.add.bitmapText(x, y, 'minecraftia', this.game.points + ' points');
      this.pointsTxt.align = 'center';
      this.pointsTxt.x = this.game.width / 2 - this.pointsTxt.textWidth / 2;


      //this.game.stage.backgroundColor = '#f06';


      y = y + this.titleTxt.height + 35;
      this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'START');
      this.startTxt.align = 'center';
      this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

      y = y + this.titleTxt.height - 35;
      this.countDownText = this.add.bitmapText(x, y, 'minecraftia', '3');
      this.countDownText.scale.x = 2;
      this.countDownText.scale.y = 2;
      this.countDownText.align = 'center';
      this.countDownText.x = this.game.width / 2 - this.startTxt.textWidth / 2;


      var tween = this.game.add.tween(this.countDownText);

      //  The object defines the properties to tween.
      //  In this case it will move to x 600
      //  The 6000 is the duration in ms - 6000ms = 6 seconds
      tween.to({ x: 600 }, 6000);


      //this.input.onDown.add(this.onDown, this);
      //this.game.state.start('game');
      this.game.maxGames = 7;
      //this.game.state.start('game3');
      //
      
      this.menuKill = this.game.time.now + 1000 * 3;
      this.counter = 3;

      this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

    },

    updateCounter: function () {
      this.counter--;
      this.countDownText.setText(this.counter);
    },

    update: function () {
      if (this.counter <= 0){
        this.start();
      }
    },

    onDown: function () {
      this.start();
    },

    start: function () {
      //this.game.state.start('game2');
      //this.game.state.start('game5');
      //
      //
      this.game.stage.backgroundColor = '#000000';
      

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
