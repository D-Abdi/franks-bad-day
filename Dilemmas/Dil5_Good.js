class Dil5_Good extends Phaser.Scene {
    constructor() {
      super({ key: 'Dil5_Good'})
    }
       create(){
        // Teken het tekstvlak en plaats de foto op de achtergrond
        bearDil = this.add.image(-150, 0, 'goat').setOrigin(0)
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
        text.appendContent('The Reaper looks surprised.', 30);
        text.appendContent(`"You actually did it. I didn't think you would have it in you."`, 30);
        text.appendContent(`"As promised you're getting another shot at life."`, 30);
        text.appendContent(`"Make it count this time."`, 30);
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
                 this.scene.stop("Dil5_Good"); 
                 this.scene.start('Good')
                 }
                })
            })
      }
}    