const config = {
    type: Phaser.AUTO, 
    width: 1000, 
    height: 800, 
    parent: "game-container", 
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    },
    scene: [Preload, Title, Disc, Intro, MG1, Dil1, Scene3, MG2, Dil2, Scene4, MG3, Dil3, Scene5_1, Dil4, Scene5_2, MG4, Scene6, Dil5, Dil5_Good, Dil5_Bad, Good, Bad, Limbo, Coward, Credits],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  };
  
  const game = new Phaser.Game(config);

  let gameState = {
    required: [],
    enemy: [],
    morality: 100,
    lives: 9
  }
  
  let disc1
  let disc2
    
  let lives;

  let moralityBar;

  let cursors;

  let bearDil
  let textblok
  let keuze1, keuze2
  let keuze1Text, keuze2Text

  let text;
  
  let thankYou
  let creators
  let ending  

  let enemySpeed = 60

   // Plug in code die ik niet helemaal begrijp
 var GetValue = Phaser.Utils.Objects.GetValue;

 function PageTypingText(scene, x, y, text, config) {
   var text = scene.add.rexBBCodeText(x, y, text, config);
   text.page = scene.plugins.get('rextextpageplugin').add(text, GetValue(config, 'page', undefined));
   text.typing = scene.plugins.get('rextexttypingplugin').add(text, GetValue(config, 'type', undefined));
   text.contents = [];
   
   text.start = function(text, speed) {      
     this.page.setText(text);
     if (speed !== undefined) {
         this.typing.setTypeSpeed(speed);
     }
     this.typeNextPage();
   };
   
   text.typeNextPage = function(speed){
     if (!this.page.isLastPage) {
       this.typing.start( text.page.getNextPage() );
     } else if (this.contents.length === 0) {
       this.emit('complete');
     }
   };
   
   text.typing.on('complete', text.typeNextPage, text);
   
   text.appendContent = function(content, speed) {
     this.contents.push([content, speed]);
     if (!this.typing.isTyping) {
       this.startNext();
     }
   }
 
   text.startNext =  function() {
     if (this.contents.length > 0) {
       var cmd = this.contents.shift();
       this.start(cmd[0], cmd[1]);
     }
   }
   
   return text;
 };
 //