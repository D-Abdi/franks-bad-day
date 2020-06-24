class Title extends Phaser.Scene {
    constructor() {
      super({ key: 'Title'})
    }
    
    create() {
      let bg = this.add.image(0, 0, 'bg');
      bg.setOrigin(0.15, .15)
  
      let titleText = this.add.text(80,300, "Frank's Bad Day", {fontSize: 140, fontFamily: "VT323"})
  
      let start = this.add.text(250,550, "Press Space to Start", {fontSize: 60, fontFamily: "VT323"})
  
      // Laat de start 
      this.tweens.add({
        targets: start,
        alpha: 0,
        duration: 1200,
        repeat: -1,
        yoyo: true
      })
  
      // Voeg regen toe
      let particles = this.add.particles('rain');

      
      
  
      let emitter = particles.createEmitter({
        x: { min: 0, max: 1000 },
        y: {min: 0, max: 800},
        lifespan: 2000,
        speedY: { min:10, max: 50},
        scale: .2,
        quantity: 5,
        blendMode: 'ADD'
      })
      
      // Play the background music
        //let music = this.sound.add('intro');
    
        // Play the background music
        //music.play();
      //  
    
      // Ga naar de volgende scene na de juiste input
      cursors = this.input.keyboard.createCursorKeys();
  
    }
    
    update() {
      // Fade out en start volgende scene
      if(cursors.space.isDown) {
        console.log('Next scene')
        this.cameras.main.fade(1000, 0, 0, 0, false, function(camera, progress) {
          if(progress > 0.99){ 
            this.scene.stop('Title');
            this.scene.start('Dil5_Bad')
          }
        }) 
      }
    }
  }