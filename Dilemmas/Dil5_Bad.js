class Dil5_Bad extends Phaser.Scene {
    constructor() {
      super({ key: 'Dil5_Bad'})
    }
       create(){
        // Teken het tekstvlak en plaats de foto op de achtergrond
        bearDil = this.add.image(-150, 0, 'goatAngry').setOrigin(0)
        textblok = this.add.rectangle(500, 600, 800, 250, 0xFFFFFF);
        textblok.setStrokeStyle(5, 0x000000)
     
        // Maak tekstblok interactief
        textblok.setInteractive();  
     
        
     
        // Maak het gebruik van toetsen mogelijk
        cursors = this.input.keyboard.createCursorKeys();    
     
        this.input.keyboard.enabled = true     
     
        // Plug in code voor de tekst en styling vooraf
          text = PageTypingText(this, 150, 520, '', {
          fontSize: '36px',
          color: '#000000',
          fontFamily: 'VT323',
          wrap: {
            mode: 'word',
            width: 700
         },
         maxLines: 7
        });
        
        // Code om te organiseren wat voor tekst er moet worden laten zien op welk moment
        text.appendContent('The Reaper looks angry.', 30);
        text.appendContent(`"Do you know how many people get a second chance in life?"`, 30);
        text.appendContent(`"The answer is none."`, 30);
        text.appendContent(`"You had yours, but you blew it on being an asshole."`, 30);
        text.appendContent(`"Now you will have to regret your desicions for all eternity."`, 30);
        text.appendContent(`"Now Die!"`, 30);
        textblok.setInteractive()
     
        this.input.keyboard.on('keydown', function () {
          text.startNext()
        })
     
        text.once('complete', function () {
             // Laat de speler niet nog een keer een input doen  
             this.scene.input.keyboard.enabled = false 
             console.log(this.scene.input.keyboard.enabled)
             // Fade de camera naar zwart en start de volgende scene             
             this.scene.cameras.main.fade(1500, 0, 0, 0, false, function(camera, progress){
                 if(progress > 0.9){     
                 this.scene.stop("Dil5_Bad"); 
                 this.scene.start('Bad')
                 }
                })
            })
      }
}    