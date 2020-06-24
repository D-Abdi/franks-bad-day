class Credits extends Phaser.Scene {
    constructor() {
      super({ key: 'Credits'})
    }

    create() {
        thankYou = this.add.text(150, 300, "Thank you for playing!", {fontSize: 80, fill: '#FFF', fontFamily: 'VT323'})
        creators = this.add.text(200, 800, "Ellis Siadis: Art Direction & Game Art\n\n\nGijsje de Vries: Game Art\n\n\nDaniël Abdi: Lead Developer\n\n\nEddie Lau: Developer", {fontSize: 40, fill: '#FFF', fontFamily: 'VT323'})

        ending = this.add.text(80, 300, "Frank's Bad Day", {fontSize: 140, fill: '#FFF', fontFamily: 'VT323'})
        ending.alpha = 0


        this.tweens.add({
            targets: thankYou,
            y: -500,
            duration: 6000,
            delay: 2000,
            ease: 'linear'
        })

        this.tweens.add({
            targets: creators,
            y: -500,
            duration: 8000,
            delay: 2000,
            ease: 'linear'
        })
        
        this.tweens.add({
            targets: ending,
            alpha: 1,
            duration: 5000,
            delay: 8800,
            ease: 'linear',
            yoyo: true,
            onComplete:  () => {
                this.scene.stop('Credits')
                this.scene.start('Title')
                gameState.lives = 9
                gameState.morality = 100
                gameState.required = []
            }
        }) 
    }

  
}