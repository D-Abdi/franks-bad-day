class MG4 extends Phaser.Scene {
    constructor() {
      super({ key: 'MG4'})
    }  

    create() {
        // Hervat animatie om een bug te tegen te gaan
        this.anims.resumeAll();

        // Runs once, after all assets in preload are loaded
        const map = this.make.tilemap({key: 'tileset'})
    
        const tileset = map.addTilesetImage('city', 'map')
    
        const worldLayer = map.createStaticLayer('Blocked', tileset, 100, 30)
        map.createStaticLayer('UnBlocked', tileset, 100, 30)
        map.createStaticLayer('Misc', tileset, 100, 30)
    
        // collision
        worldLayer.setCollisionByProperty({collides: true})
    
        // Toevoegen van de spritesheet
        gameState.player = this.physics.add.sprite(300, 300, 'Frank')
        gameState.enemy = this.physics.add.sprite(500, 250, 'Dog')
        gameState.enemy2 = this.physics.add.sprite(800, 500, 'Dog')
        gameState.enemy3 = this.physics.add.sprite(300, 600, 'Dog')
        gameState.enemy4 = this.physics.add.sprite(800, 250, 'Dog')

        // Levens
        lives = this.add.sprite(900, 50, '9lives')
       
        // Animaties toevoegen voor bewegingen
        this.anims.create({
          key: 'run',
          frames: this.anims.generateFrameNumbers('Frank', { start: 1, end: 5 }),
          frameRate: 8,
          repeat: -1
        });

        this.anims.create({
          key: 'idle',
          frames: this.anims.generateFrameNumbers('Frank', { start: 0, end: 1 }),
          frameRate: 2,
          repeat: -1
        });
      
        // Hond animaties
        this.anims.create({
          key: 'dogRun',
          frames: this.anims.generateFrameNumbers('Dog', { start: 1, end: 5 }),
          frameRate: 5,
          repeat: -1
        }); 

        this.anims.create({
          key: 'dogIdle',
          frames: this.anims.generateFrameNumbers('Dog', { start: 0, end: 1 }),
          frameRate: 2.5,
          repeat: -1
        }); 
          
        // Make the enemy's dangerous
        this.physics.add.overlap(gameState.player, gameState.enemy, () => {
          gameState.lives--
          console.log('Game Over')
          this.scene.restart();
          })
          
        this.physics.add.overlap(gameState.player, gameState.enemy2, () => {
          gameState.lives--
          console.log('Game Over')
          this.scene.restart();
          })
    
        this.physics.add.overlap(gameState.player, gameState.enemy3, () => {
          gameState.lives--  
          console.log('Game Over')
          this.scene.restart();
          })
    
        this.physics.add.overlap(gameState.player, gameState.enemy4, () => {
          gameState.lives--  
          console.log('Game Over')
          this.scene.restart();
          })      
    
          // Zorgt ervoor dat de speler niet van het scherm af gaat
        gameState.player.setCollideWorldBounds(true);
        gameState.enemy.setCollideWorldBounds(true);
        gameState.enemy2.setCollideWorldBounds(true);
        gameState.enemy3.setCollideWorldBounds(true);
        gameState.enemy4.setCollideWorldBounds(true);

        this.physics.add.collider(gameState.player, worldLayer)
        this.physics.add.collider(gameState.enemy, worldLayer)
        this.physics.add.collider(gameState.enemy2, worldLayer)
        this.physics.add.collider(gameState.enemy3, worldLayer)
        this.physics.add.collider(gameState.enemy4, worldLayer)
    
        // Voegt het controle schema toe aan de playerSprite
        gameState.cursors = this.input.keyboard.createCursorKeys();
    
        // bounce zodat het lijkt alsof de enemy een patrouilleerd wanneer je uit range bent
        gameState.enemy.body.bounce.x = 1
        gameState.enemy.body.bounce.y = 1
    
        gameState.enemy2.body.bounce.x = 1
        gameState.enemy2.body.bounce.y = 1
    
        gameState.enemy3.body.bounce.x = 1
        gameState.enemy3.body.bounce.y = 1  
    
        gameState.enemy4.body.bounce.x = 1
        gameState.enemy4.body.bounce.y = 1

        // Laat de game objective zien
        let objText = this.add.text(300, 300, "Avoid the enemy's", {fontSize: 60, fontFamily: "VT323",})   
        
        // fade hem na tonen
        this.tweens.add({
          targets: objText,
          alpha: 0,
          delay: 2000,
          duration: 1500,
          repeat: 0,
          yoyo: false
        })    
        
        // Cointdown code
        this.initialTime = 15;

        let cdText = this.add.text(650, 25, "Time Left: " + formatTime(this.initialTime), {fontSize: 30, fill: '#FFF', fontFamily: 'VT323'});
    
        // 1 sec aan delay
        let timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true }); 
           
        function formatTime(seconds){
          // Minuten
          var minutes = Math.floor(seconds/60);
          // Seconden
          var partInSeconds = seconds%60;
          // Nullen toevoegen
          partInSeconds = partInSeconds.toString().padStart(2,'0');
      
          // Returns formated time
          return `${minutes}:${partInSeconds}`;
      }
 
      function onEvent (){
        this.initialTime -= 1; // 1 seconde eraf
        cdText.setText("Time Left: " + formatTime(this.initialTime));
        if (gameState.lives != 0){
          if (this.initialTime == 0){
              // Freeze frame
              this.physics.pause()
              this.anims.pauseAll()
          
              // laat de speler weten dat hij verloren heeft
              timedEvent.remove(false);
              cdText.setText("You Won!")
              this.cameras.main.fade(1100, 0, 0, 0, false, function(camera, progress) {
                if(progress > 0.9) {
                  this.scene.stop('MG4')
                  this.scene.start('Dil5')
                  
                }
              })               
          } 
      }         
    }         
      }


     update() {
        new Lives();

        const speed = 200;
        const prevVelocity = gameState.player.body.velocity.clone();
    
        gameState.player.setVelocity(0);
    
          // Horizontal movement
          if (gameState.cursors.left.isDown) {
            gameState.player.body.setVelocityX(-speed);
            gameState.player.flipX = true;
          }else if (gameState.cursors.right.isDown) {
            gameState.player.body.setVelocityX(speed);
            gameState.player.flipX = false;
          }
    
         // Vertical movement
         if (gameState.cursors.up.isDown) {
          gameState.player.body.setVelocityY(-speed);
         }else if (gameState.cursors.down.isDown) {
          gameState.player.body.setVelocityY(speed);
         }

         // Animaties voor movement
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
         
         // Normalize and scale the velocity so that player can't move faster along a diagonal
         gameState.player.body.velocity.normalize().scale(speed);

         // Debug voor het moonwalk probleem
         if(gameState.player.body.x < gameState.enemy.body.x) {
          gameState.enemy.flipX = true

         } else {
          gameState.enemy.flipX= false
         }

         if(gameState.player.body.x < gameState.enemy2.body.x) {
          gameState.enemy2.flipX = true

         } else {
          gameState.enemy2.flipX= false
         }

         if(gameState.player.body.x < gameState.enemy3.body.x) {
          gameState.enemy3.flipX = true

         } else {
          gameState.enemy3.flipX= false
         }

         if(gameState.player.body.x < gameState.enemy4.body.x) {
          gameState.enemy4.flipX = true

         } else {
          gameState.enemy4.flipX= false
         }

         // Einde Debug sectie
         //
         
         // Alternate tussen walk en idle 
         if(gameState.enemy.body.velocity.x > 0 || gameState.enemy.body.velocity.x < 0) {
          gameState.enemy.anims.play('dogRun', true);
         } else {
          gameState.enemy.anims.play('dogIdle', true);
         }

         if(gameState.enemy2.body.velocity.x > 0 || gameState.enemy2.body.velocity.x < 0) {
          gameState.enemy2.anims.play('dogRun', true);
         } else {
          gameState.enemy2.anims.play('dogIdle', true);
         }

         if(gameState.enemy3.body.velocity.x > 0 || gameState.enemy3.body.velocity.x < 0) {
          gameState.enemy3.anims.play('dogRun', true);
         } else {
          gameState.enemy3.anims.play('dogIdle', true);
         }

         if(gameState.enemy4.body.velocity.x > 0 || gameState.enemy4.body.velocity.x < 0) {
          gameState.enemy4.anims.play('dogRun', true);
         } else {
          gameState.enemy4.anims.play('dogIdle', true);
         }                 
         //

         function followPlayer() {
          if(gameState.player.body.x < gameState.enemy.body.x) {
            gameState.enemy.body.flipX = true
            gameState.enemy.body.velocity.x = enemySpeed * -1;
          }
          else {
            gameState.enemy.body.flipX = false
            gameState.enemy.body.velocity.x = enemySpeed;
          }
          if(gameState.player.body.y < gameState.enemy.body.y) {
            gameState.enemy.body.velocity.y = enemySpeed * -1;
            
          }
          else {
            gameState.enemy.body.velocity.y = enemySpeed;
          }
        }
        
        function followPlayer2() {
          if(gameState.player.body.x < gameState.enemy2.body.x) {
            gameState.enemy2.body.flipX = true
            gameState.enemy2.body.velocity.x = enemySpeed * -1;
          }
          else {
            gameState.enemy2.body.flipX = false
            gameState.enemy2.body.velocity.x = enemySpeed;
          }
          if(gameState.player.body.y < gameState.enemy2.body.y) {
            gameState.enemy2.body.velocity.y = enemySpeed * -1;
          }
          else {
            gameState.enemy2.body.velocity.y = enemySpeed;
          }
        } 
    
        function followPlayer3() {
          if(gameState.player.body.x < gameState.enemy3.body.x) {
            gameState.enemy3.body.flipX = true
            gameState.enemy3.body.velocity.x = enemySpeed * -1;
            
          }
          else {
            gameState.enemy3.body.flipX = false
            gameState.enemy3.body.velocity.x = enemySpeed;
          }
          if(gameState.player.body.y < gameState.enemy3.body.y) {
            gameState.enemy3.body.velocity.y = enemySpeed * -1;
          }
          else {
            gameState.enemy3.body.velocity.y = enemySpeed;
          }
        } 
        
        function followPlayer4() {
          if(gameState.player.body.x < gameState.enemy4.body.x) {
            gameState.enemy4.body.flipX = true
            gameState.enemy4.body.velocity.x = enemySpeed * -1;
          }
          else {
            gameState.enemy4.body.flipX = false
            gameState.enemy4.body.velocity.x = enemySpeed;
          }
          if(gameState.player.body.y < gameState.enemy4.body.y) {
            
            gameState.enemy4.body.velocity.y = enemySpeed * -1;
          }
          else {
            
            gameState.enemy4.body.velocity.y = enemySpeed;
          }
        }     
        
        if(Phaser.Math.Distance.Between(gameState.enemy.body.x, gameState.enemy.body.y, gameState.player.body.x,gameState.player.body.y) < 300) {
            followPlayer()
          }
          
        if(Phaser.Math.Distance.Between(gameState.enemy2.body.x, gameState.enemy2.body.y, gameState.player.body.x,gameState.player.body.y) < 300) {
            followPlayer2()
          }       
    
        if(Phaser.Math.Distance.Between(gameState.enemy3.body.x, gameState.enemy3.body.y, gameState.player.body.x,gameState.player.body.y) < 300) {
            followPlayer3()
          }   
      
        if(Phaser.Math.Distance.Between(gameState.enemy4.body.x, gameState.enemy4.body.y, gameState.player.body.x,gameState.player.body.y) < 300) {
            followPlayer4()
          }
        
      
        console.log(gameState.enemy.body.flipX)


        // Laat de speler opnieuw starten na een Game Over scherm
        if(gameState.cursors.space.isDown && this.initialTime == 0) {
            this.anims.resumeAll();
            this.scene.stop('MG4')
            this.scene.start('Title')
        }
        
        // Complete game over en restart
        if(gameState.lives == 0) {
          this.physics.pause()
          this.anims.pauseAll()

          this.add.text(160, 300, "You ran out of lives!", {fontSize: 80, fill: '#FFF', fontFamily: 'VT323'})
          this.add.text(290, 400, "Press Space too play again", {fontSize: 40, fill: '#FFF', fontFamily: 'VT323'})  
        }
        if(gameState.cursors.space.isDown && gameState.lives == 0) {
          this.anims.resumeAll();
          gameState.morality = 100;
          gameState.required = [];          
          gameState.lives = 9;
          this.scene.stop('MG4')
          this.scene.start('Title')
        }         
      } 
}