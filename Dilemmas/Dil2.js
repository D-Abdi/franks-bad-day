class Dil2 extends Phaser.Scene {
    constructor() {
      super({ key: 'Dil2'})
    }
       create(){
        // moral bar
        moralityBar = this.add.sprite(800, 75, 'morality').setScale(2.3)
        moralityBar.setDepth(1) 

        // Teken het tekstvlak en plaats de foto op de achtergrond
        bearDil = this.add.image(-150, 0, 'bear').setOrigin(0)
        textblok = this.add.rectangle(500, 600, 800, 250, 0xFFFFFF);
        textblok.setStrokeStyle(5, 0x000000)
     
        // Maak tekstblok interactief
        textblok.setInteractive();  
     
        
     
        // Maak het gebruik van toetsen mogelijk
        cursors = this.input.keyboard.createCursorKeys();    
     
        this.input.keyboard.enabled = true
        console.log(this.input.keyboard.enabled )
     
        // Zorg ervoor dat de speler twee opties heeft om uit te kiezen
        keuze1 = this.add.rectangle(300, 600, 220, 125, 0xFFFFFF)
        keuze1.setStrokeStyle(2, 0x000000)
        keuze2 = this.add.rectangle(675, 600, 220, 125, 0xFFFFFF)
        keuze2.setStrokeStyle(2, 0x000000)
     
        // Maak de opties interactief
        keuze1.setInteractive()
        keuze2.setInteractive()
     
        // Tekst in de optieblokken
        keuze1Text = this.add.text(205, 570, 'Tell your boss\nto f*ck off', {fontSize: '25px', color: '0x000000', fontFamily: 'VT323'}).setDepth(0.1)
        
        keuze2Text = this.add.text(575, 550, `Tell your boss you'll\ndo the job, and hand the\njob over to one of your\ncolleagues`, {fontSize: '21px', color: '0x000000', fontFamily: 'VT323'}).setDepth(0.1)
     
        // Zorg dat ze nog niet zichtbaar zijn
        keuze1.visible = false
        keuze2.visible = false    
     
        keuze1Text.visible = false
        keuze2Text.visible = false
     
     
        // Plug in code voor de tekst en styling vooraf
          text = PageTypingText(this, 150, 520, '', {
          fontSize: '36px',
          fontFamily: 'VT323',
          color: '#000000',
          wrap: {
            mode: 'word',
            width: 700
         },
         maxLines: 7
        });
        
        // Code om te organiseren wat voor tekst er moet worden laten zien op welk moment
        text.appendContent('Your boss stands infront of your desk', 30);
        text.appendContent(`"Morning Frank, There have been a lot of lay offs these couple of weeks so i need you to do some extra work. Unpaid ofcourse. I'm sure you don't mind?"`, 30);
        text.appendContent('(What are you going to do?)', 30);
        textblok.setInteractive()
     
        this.input.keyboard.on('keydown', function () {
          text.startNext()
        })
     
        text.once('complete', function () {
          // Haal de opties en de bijbehorende tekst tevoorschijn
          this.scene.input.keyboard.on('keydown' ,function(){
          text.contents = [];  
          text.visible = false
          keuze1.visible = true
          keuze2.visible = true
     
          keuze1Text.visible = true
          keuze2Text.visible = true
        })}) 
        
        // Zorg dat de opties nog niet actief zijn voordat de speler er 1 selecteerd
        keuze1.active = false
        keuze2.active = false
      }
     
     
      
       update() {
         new Morality()
        // Laat de speler viueel zien dat hij een keuze maakt
        if(cursors.left.isDown) {
          keuze1.active = true
          keuze2.active = false
          keuze1.setFillStyle(0x4d4d4d, .5)
          keuze1.setStrokeStyle(2, 0x4d4d4d)
     
          keuze2.setFillStyle(0xFFFFFF, 1)
          keuze2.setStrokeStyle(2, 0x000000)
          console.log(keuze1.active)  
     
        } else if(cursors.right.isDown) {
          keuze2.active = true
          keuze1.active = false
          keuze2.setFillStyle(0x4d4d4d, .5)
          keuze2.setStrokeStyle(2, 0x4d4d4d)
     
          keuze1.setFillStyle(0xFFFFFF, 1)
          keuze1.setStrokeStyle(2, 0x000000)  
          console.log(keuze2.active)  
        }
        
        // Laat de speler beslissen
        if(cursors.space.isDown && keuze1.active == true ) {
          bearDil.setTexture('bearAngry', 0)
     
          console.log('optie 1 selected')
     
          // Maak keuze1.active niet actief zodat je niet nog een keer kan klikken
          keuze1.active = false
          //
     
          keuze1.visible = false
          keuze2.visible = false    
      
          keuze1Text.visible = false
          keuze2Text.visible = false
     
          text.visible = true
     
          text.startNext()
          // Tekst na selectie keuze
          text.appendContent(`"Excuse me?! Who do you think you are, talking to me like that? You're fired Frank! Empty your desk and f*ck off!"\n                   -10 Points`, 30)

          // Morality omlaag halen
          gameState.morality -= 10
          console.log(gameState.morality)
          //          
     
          text.once('complete', function () {
             // Laat de speler niet nog een keer een input doen 
             this.scene.input.keyboard.enabled = false
             console.log(this.scene.input.keyboard.enabled)
             // Fade de camera naar zwart en start de volgende scene
             this.scene.cameras.main.fade(1500, 0, 0, 0, false, function(camera, progress){
             if(progress > 0.9){    
             this.scene.stop("Dil2"); 
             this.scene.start('MG3')
         }})})}
     
        if(cursors.space.isDown && keuze2.active == true ) {
          bearDil.setTexture('bearHappy', 0)
          bearDil.setPosition(-150,-200)
          
          console.log('optie 2 selected')
     
          // Maak keuze2.active niet actief zodat je niet nog een keer kan klikken
          keuze2.active = false
          //
     
          keuze1.visible = false
          keuze2.visible = false    
      
          keuze1Text.visible = false
          keuze2Text.visible = false
     
          text.visible = true
          
          text.startNext()

          // Morality omlaag halen
          gameState.morality -= 20
          console.log(gameState.morality)
          //          
     
          text.appendContent(`"That's the spirit! Happy to have you Frank!\n\n\n                   -20 Points`, 30)
     
          text.once('complete', function () { 
             // Laat de speler niet nog een keer een input doen  
             this.scene.input.keyboard.enabled = false 
             console.log(this.scene.input.keyboard.enabled)
             // Fade de camera naar zwart en start de volgende scene             
             this.scene.cameras.main.fade(1500, 0, 0, 0, false, function(camera, progress){
                 if(progress > 0.9){     
                 this.scene.stop("Dil2"); 
                 this.scene.start('MG3')
             }})})}         
      }    
}    