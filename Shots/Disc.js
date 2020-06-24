class Disc extends Phaser.Scene {
    constructor() {
      super({ key: 'Disc'})
    }

    create() {
        disc1 = this.add.text(100, 300, "You have 9 lives. Lose them, and it's Game Over.", {fontSize: 40, fill: '#FFF', fontFamily: 'VT323'})
        disc2 = this.add.text(100, 300, "Your decisions affect the ending of the game.", {fontSize: 40, fill: '#FFF', fontFamily: 'VT323'})

        disc1.alpha = 0
        disc2.alpha = 0

        this.tweens.add({
            targets: disc1,
            alpha: 1,
            duration: 2000,
            ease: 'linear',
            yoyo: true,
        }) 

        this.tweens.add({
            targets: disc2,
            alpha: 1,
            duration: 2500,
            delay: 4500,
            ease: 'linear',
            yoyo: true,
            onComplete: () => {
                this.scene.stop('Disc')
                this.scene.start('MG1')
            }
        }) 
    }
}