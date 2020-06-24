class Good extends Phaser.Scene {
    constructor() {
      super({ key: 'Good'})
    }
    create(){

        let ending4_1 = this.add.text(335, 200, "Ending 1:", {fontSize: 80, fill: '#FFF', fontFamily: 'VT323'})
        let ending4_2 = this.add.text(310, 270, "Good", {fontSize: 200, fill: '#FFF', fontFamily: 'VT323'})

        ending4_1.alpha = 0
        ending4_2.alpha = 0

        this.tweens.add({
            targets: ending4_1,
            alpha: 1,
            duration: 3500,
            delay: 500,
            ease: 'linear',
            yoyo: true
        })

        this.tweens.add({
            targets: ending4_2,
            alpha: 1,
            duration: 3500,
            delay: 2000,
            ease: 'linear',
            yoyo: true,
            onComplete: () => {
                this.scene.stop('Good')
                this.scene.start('Credits')
            }
        })

    }
}