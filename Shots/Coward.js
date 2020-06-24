class Coward extends Phaser.Scene {
    constructor() {
      super({ key: 'Coward'})
    }

    create(){

        let ending4_1 = this.add.text(375, 200, "Ending 4:", {fontSize: 80, fill: '#FFF', fontFamily: 'VT323'})
        let ending4_2 = this.add.text(275, 270, "Coward", {fontSize: 200, fill: '#FFF', fontFamily: 'VT323'})

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
                this.scene.stop('Coward')
                this.scene.start('Credits')
            }
        })

    }
}