class MG3 extends Phaser.Scene {
    constructor() {
      super({ key: 'MG3'})
    }

    create() {
        // Maak een class aan voor de animaties
        this.routes = new RouteAnim() 

        // Map maken
        const map3 = this.make.tilemap({key: 'map3'});

        const tileset3 = map3.addTilesetImage('rpg', 'tiles3')
        
        map3.createStaticLayer('Floor', tileset3, 125, 40)
        map3.createStaticLayer('Carpet', tileset3, 125, 40)
        const worldLayer3 = map3.createStaticLayer('Blocked', tileset3, 125, 40)
        const belowLayer3 = map3.createStaticLayer('UnBlocked', tileset3, 125, 40)
        

        worldLayer3.setCollisionByProperty({ collides: true });
        
        
        // Speler aanmaken
        gameState.player = this.physics.add.sprite(450, 670, 'FrankKnife')

        gameState.player.setCollideWorldBounds(true);
        gameState.cursors = this.input.keyboard.createCursorKeys();

        // Levens
        lives = this.add.sprite(900, 50, '9lives')

        // Animaties toevoegen voor bewegingen
        this.anims.create({
          key: 'run',
          frames: this.anims.generateFrameNumbers('FrankKnife', { start: 1, end: 5 }),
          frameRate: 8,
          repeat: -1
        });

        this.anims.create({
          key: 'idle',
          frames: this.anims.generateFrameNumbers('FrankKnife', { start: 0, end: 1 }),
          frameRate: 2,
          repeat: -1
        }); 
                
        this.physics.add.collider(gameState.player, worldLayer3)

        // Enemy toevoegen 
        gameState.enemy = this.physics.add.sprite(495, 605, 'Snake')

        // Sneeuwman animaties
        this.anims.create({
          key: 'snakeRun',
          frames: this.anims.generateFrameNumbers('Snake', { start: 0, end: 2 }),
          frameRate: 6,
          repeat: -1
        });

        // Laat de game objective zien
        let objText = this.add.text(325, 300, "Get Him! Quick!", {fontSize: 70, fontFamily: "VT323",})
  
        // fade hem na tonen
        this.tweens.add({
          targets: objText,
          alpha: 0,
          delay: 2500,
          duration: 1500,
          repeat: 0,
          yoyo: false
        })    

        gameState.enemy.anims.play('snakeRun', true);

        // Routes voor de AI 
        let timeline = this.tweens.timeline({
  
          targets: gameState.enemy,
          
  
          tweens: this.routes.returnRoute()
        })

        // Overlap tussen enemy en speler
        this.physics.add.overlap(gameState.player, gameState.enemy, () => {
          timeline.stop()
          this.anims.pauseAll()
          this.cameras.main.fade(1100, 0, 0, 0, false, function(camera, progress) {
            if(progress > 0.99) {
              this.scene.stop('MG3')
              this.scene.start('Dil3')
            }
          }
        )})

        // Lose condition maken
        let door = this.physics.add.sprite(495, 700, 'door').setScale(.075)
        door.visible = false;

        this.physics.add.overlap(gameState.enemy, door, () => {
          this.physics.pause()
          this.anims.pauseAll()
          gameState.lives--
          if(gameState.lives != 0) {
          this.add.text(340, 300, "He Escaped!", {fontSize: 80, fill: '#FFF', fontFamily: 'VT323'})
          this.add.text(325, 400, "Press Space too try again", {fontSize: 40, fill: '#FFF', fontFamily: 'VT323'})                   
        }})        
    }

    update() {
        new Lives()
        const speed = 200;

        gameState.player.setVelocity(0);
    
        // Horizontale beweging
        if (gameState.cursors.left.isDown) {
          gameState.player.body.setVelocityX(-speed);
          gameState.player.flipX = true;
        }else if (gameState.cursors.right.isDown) {
          gameState.player.body.setVelocityX(speed);
          gameState.player.flipX = false;
        }
    
        // Verticale beweging
        if (gameState.cursors.up.isDown) {
          gameState.player.body.setVelocityY(-speed);
        }else if (gameState.cursors.down.isDown) {
          gameState.player.body.setVelocityY(speed);
        }
         
         // Normalize de snelheid van de speler en scale de snelheid altijd met de variabele die eerder is gegeven
        gameState.player.body.velocity.normalize().scale(speed);
    
        // Voeg animaties toe
        if (gameState.cursors.left.isDown) {
           gameState.player.anims.play('run', true);
        }else if (gameState.cursors.right.isDown) {
           gameState.player.anims.play('run', true);
        }else if (gameState.cursors.up.isDown) {
           gameState.player.anims.play('run', true);
        }else if (gameState.cursors.down.isDown) {
           gameState.player.anims.play('run', true);
        } else {
           gameState.player.anims.play('idle', true);
       }

       if(gameState.cursors.space.isDown) {
        this.anims.resumeAll();
        this.scene.restart()
       }

      // Complete game over en restart
      if(gameState.lives == 0) {
        this.physics.pause()
        this.anims.pauseAll()

        this.add.text(180, 300, "You ran out of lives!", {fontSize: 80, fill: '#FFF', fontFamily: 'VT323'})
        this.add.text(310, 400, "Press Space too play again", {fontSize: 40, fill: '#FFF', fontFamily: 'VT323'})  
      }
      if(gameState.cursors.space.isDown && gameState.lives == 0) {
        this.anims.resumeAll();
        gameState.morality = 100;
        gameState.required = [];        
        gameState.lives = 9;
        this.scene.stop('MG3')
        this.scene.start('Title')
      }       
    } 
}
