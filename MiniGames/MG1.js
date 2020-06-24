class MG1 extends Phaser.Scene {
  constructor() {
    super({ key: 'MG1'})
  }
  
   create() {
    // Dit is belangrijk voor de game over restart
    gameState.active = true; 

    // Levens 
    lives = this.add.sprite(900, 50, '9lives')

    //new
    const map = this.make.tilemap({key: 'map'});

    const tileset = map.addTilesetImage('rpg', 'tiles')
    
    map.createStaticLayer('Carpet', tileset, 100, 40)
    map.createStaticLayer('Floor', tileset, 100, 40)
    const worldLayer = map.createStaticLayer('Blocked', tileset, 100, 40)
    const belowLayer = map.createStaticLayer('UnBlocked', tileset, 100, 40)

    worldLayer.setCollisionByProperty({ collides: true });

    gameState.player = this.physics.add.sprite(500, 400, 'Frank').setScale(1)
    gameState.player.setCollideWorldBounds(true);
    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(gameState.player, worldLayer)

    // Voeg vereiste objecten toe aan het scherm en maak ze doorzichtig
    gameState.requiredText = this.add.text(150, 25, 'Required: ', {fontSize: 30, fill: '#FFF', fontFamily: 'VT323'})

    let reqWallet = this.add.sprite(320, 39, 'wallet').setScale(.080)
    reqWallet.alpha = 0.25;

    let reqKeys = this.add.sprite(400, 40, 'keys').setScale(.065)
    reqKeys.alpha = 0.25;

    let reqPhone = this.add.sprite(480, 40, 'phone').setScale(.080)
    reqPhone.alpha = 0.25

    let reqYarn = this.add.sprite(560, 42, 'yarn').setScale(.095)
    reqYarn.alpha = 0.25

    // Voeg statische objecten toe
    let wallet = this.physics.add.sprite(250, 550, 'wallet').setScale(.06)
    let keys = this.physics.add.sprite(650, 620, 'keys').setScale(.05)
    let phone = this.physics.add.sprite(700, 200, 'phone').setScale(.07)
    let yarn = this.physics.add.sprite(250, 270, 'yarn').setScale(.07)


    let door = this.physics.add.sprite(740, 312, 'door').setScale(.065)
    door.visible = false;

    // Laat de game objective zien
    let objText = this.add.text(350,250, " Pick up your stuff\nand leave the house", {fontSize: 40, fontFamily: "VT323"})
  
    // fade hem na tonen
    this.tweens.add({
      targets: objText,
      alpha: 0,
      delay: 2000,
      duration: 1500,
      repeat: 0,
      yoyo: false
    })
    

    // Collision tussen speler en objecten
    this.physics.add.collider(gameState.player, wallet, () => {
      wallet.destroy();

      reqWallet.alpha = 1;
      gameState.required.push('fill1')
    })

    this.physics.add.collider(gameState.player, keys, () => {
      keys.destroy();

      reqKeys.alpha = 1;
      gameState.required.push('fill2')
    })

    this.physics.add.collider(gameState.player, phone, () => {
      phone.destroy();

      reqPhone.alpha = 1;
      gameState.required.push('fill3')
    })

    this.physics.add.collider(gameState.player, yarn, () => {
      yarn.destroy();

      reqYarn.alpha = 1;
      gameState.required.push('fill4')
    })

    this.physics.add.overlap(gameState.player, door, () => {
      if(gameState.required.includes('fill1') && gameState.required.includes('fill2') && gameState.required.includes('fill3') && gameState.required.includes('fill4')) {
        console.log('Exit')
        this.cameras.main.fade(1100, 0, 0, 0, false, function(camera, progress) {
          if(progress > 0.9) {
            gameState.required = [];
            this.scene.stop('MG1')
            this.scene.start('Dil1')
            
          } 
        })
      } else {
        console.log('Not yet')
        this.add.text(55, 27, '---->', {fontSize: 25, fill: '#FFF'})
      }
    })

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

    // Countdown code   
    this.initialTime = 30;

    let cdText = this.add.text(650, 25, 'Time Left: ' + formatTime(this.initialTime), {fontSize: 30, fill: '#FFF', fontFamily: 'VT323'});

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
    cdText.setText('Time Left: ' + formatTime(this.initialTime));

    if (this.initialTime == 0){
        // Freeze frame
        this.physics.pause()
        this.anims.pauseAll()
        

        // laat de speler weten dat hij verloren heeft
        timedEvent.remove(false);
        let gameOverText = this.add.text(160, 300, "You're Late for work!", {fontSize: 80, fill: '#FFF', fontFamily: 'VT323'})
        let tryAgainText = this.add.text(290, 400, "Press Space too try again", {fontSize: 40, fill: '#FFF', fontFamily: 'VT323'})
        cdText.setText("Time's Up!")
        gameState.lives--
        gameState.required = [];
    }
}
    

  }

   update() {
    new Lives();

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

    // Laat zien waar de uitgang is als alles is opgepakt
    if(gameState.required.includes('fill1') && gameState.required.includes('fill2') && gameState.required.includes('fill3') && gameState.required.includes('fill4')) {
      this.add.text(800, 300, '<-- GO!', {fontSize: 40, fill: '#FFF', fontFamily: "VT323"})
    }   
     
   // Laat de speler opnieuw starten na een Game Over scherm
   if(gameState.cursors.space.isDown && this.initialTime == 0) {
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
    this.scene.stop('MG1')
    this.scene.start('Title')
  }    
}
}
  
  